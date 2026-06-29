---
title: Polars lazy frame
description: Polars lazy frame 으로 OOM 해결하기
pubDate: 2026-06-26
category: study
tags:
  - polars
  - lazy-evaluation
  - oom
  - memory
  - data-engineering
---

## 문제: OOM

Databricks 파이프라인으로 모델 학습 노트북을 돌리던 중 OOM이 발생했다. 에러 메시지는 아래와 같았다.

```txt
Futures timed out after [30 seconds]
```

타임아웃이라서 처음엔 쿼리가 느려서 잘린 줄 알았는데, 코드에 타임아웃 설정은 없었다. 실제 흐름은 이랬다.

> 드라이버 Python 프로세스가 메모리를 다 쓰고 죽음 → 드라이버가 응답 불가 → Spark가 보낸 RPC가 응답을 못 받고 `Futures timed out` → 클러스터 다운 → 실행 중이던 셀과 이후 셀이 모두 `cancelled`.

정리하면, 에러 없는 cancelled 연쇄에 `Futures timed out`이 같이 보이면 OOM으로 보면 된다. 코드 버그가 아니라 프로세스가 메모리 부족으로 죽은 것이었다.

## 원인 분석

문제가 된 노트북의 toy 코드다.

```python
import polars as pl

# (A) 큰 parquet을 전부 메모리로 로드
df = pl.scan_parquet("data/*.parquet").collect()   # 수천만 행 × 수백 컬럼

# (B) 파생 컬럼 추가
df2 = df.with_columns(
    pl.col("timestamp").str.slice(0, 10).alias("date")
)

# (C) 학습용/검증용으로 분리
train = df2.filter(pl.col("date") < "2026-05-18").select(feature_cols)
valid = df2.filter(pl.col("date") == "2026-05-18").select(feature_cols)

print(train.height, valid.height)   # ← 여기서 죽음
```

(A)에 `scan_parquet`이라는 lazy 함수를 쓰고도 바로 `.collect()`를 붙여 그 효과를 없애고 있었다.

(C)에서 프로세스가 죽었고, 이유는 그 순간 메모리에 큰 객체 여러개가 동시에 떠 있었기 때문이다.

| 객체      | 정체                       | 메모리 |
| ------- | ------------------------ | --- |
| `df`    | 전체 데이터 풀로드               | big |
| `df2`   | `df` + 파생 컬럼 (사실상 또 한 벌) | big |
| `train` | (C)에서 만든 또 한 벌           | big |
| `valid` | (C)에서 만든 또 한 벌           | big |

(A)~(C)를 거치며 같은 데이터의 복사본 4개가 동시에 메모리에 있었다. 각 셀의 출력은 정상이었지만 (C)에서 마지막 2개를 올리는 순간 드라이버 RAM을 넘긴 것 같다.

## 해결: Polars lazy evaluation

중간 peak이 문제였으므로 Polars의 lazy evaluation을 도입했다. 이미 `scan_parquet`을 쓰고 있었으므로 `.collect()`를 나중으로 옮기기만 하면 되었다.

### DataFrame(eager) vs LazyFrame(lazy)

Polars엔 데이터를 다루는 객체가 두 종류 있다.

| | `DataFrame` (eager) | `LazyFrame` (lazy) |
| --- | --- | --- |
| 생성 | `pl.read_parquet()`, `.collect()` 결과 | `pl.scan_parquet()` |
| 데이터가 메모리에 | 있음 (이미 읽음) | 없음 (아직 안 읽음) |
| `.filter()` / `.select()` | 즉시 계산해 새 DataFrame | 계산 안 하고 "할 일 목록"에만 기록 |
| 실제 실행 | 매 연산마다 | `.collect()` 부를 때 한 번에 |

`scan_parquet`은 파일을 읽지 않고 "여길 읽을 것이다"라는 계획(LazyFrame)만 만든다. 이후 `filter`, `select`는 계획에 기록만 되고, `.collect()`를 부르는 순간 실행된다.

### collect()가 하는 일

`.collect()`는 실행 직전에 쌓인 계획 전체를 보고 자동 최적화(query optimization)를 한다.

- **Projection pushdown (컬럼 가지치기)**: `select`로 일부 컬럼만 쓸 걸 미리 아니까, parquet에서 필요한 컬럼만 읽는다.
- **Predicate pushdown (행 가지치기)**: `filter` 조건을 읽기 단계로 내려서, 조건에 맞는 행만 읽는다.

그래서 데이터 전체가 아니라 필요한 부분만 메모리에 올라으므로 메모리 피크가 작아진다. 기존 코드의 경우 (A)에서 조건을 걸기 전 `.collect()`를 먼저 불렀기 때문에 최적화가 불가능했던 것 같다.

### Before / After

Before — 풀카피 4개

```python
df = pl.scan_parquet("data/*.parquet").collect()   # 전체 풀로드
df2 = df.with_columns(pl.col("timestamp").str.slice(0, 10).alias("date"))
train = df2.filter(pl.col("date") < "2026-05-18").select(feature_cols)
valid = df2.filter(pl.col("date") == "2026-05-18").select(feature_cols)
```

After — `.collect()`를 끝으로 미룸

```python
import gc

lf = pl.scan_parquet("data/*.parquet")             # 계획만 (데이터 0)
lf = lf.with_columns(pl.col("timestamp").str.slice(0, 10).alias("date"))

try:
    train = (
        lf.filter(pl.col("date") < "2026-05-18")
          .select(feature_cols)
          .collect(streaming=True)   # 걸러진 train만, 청크 단위로
    )
    valid = (
        lf.filter(pl.col("date") == "2026-05-18")
          .select(feature_cols)
          .collect(streaming=True)   # 걸러진 valid만, 청크 단위로
    )
finally:
    # lazy는 collect 시점에 파일을 읽으므로, 캐시 삭제는 반드시 collect 이후
    cleanup_temp_files()

# pandas로 넘긴 뒤 polars 쪽은 회수
train_pd, valid_pd = train.to_pandas(), valid.to_pandas()
del train, valid, lf
gc.collect()
```

After 시점에 동시에 살아있는 건 `lf`(계획만이라 거의 0) + `train` + `valid` 뿐이다. 전체 풀카피(`df`, `df2`)가 존재하지 않는다. 여기에 추가로 취할 수 있는 방법을 배웠다. 

- **`collect(streaming=True)`**: 데이터를 청크로 나눠 처리해 collect 자체의 peak 메모리를 낮춘다. 단 polars 버전에 따라 `streaming=True`가 deprecated되고 `engine="streaming"` 같은 신문법으로 바뀌었으니, 실행 로그에 deprecation 경고나 streaming fallback 메시지가 없는지 확인해야 한다.
- **`finally` + collect 이후 삭제**: 임시 parquet을 collect 직후에 정리한다. lazy는 파일을 늦게 읽기 때문에 collect 전에 지우면 안 된다. 로드 직후 `finally`에서 바로 지우면 읽을 때 파일이 없어 깨진다.
- **`del` + `gc.collect()`**: pandas로 넘긴 뒤 polars 객체와 lazy 스캔을 해제한다. LazyFrame 자체는 작아도, OOM 직전 상황에선 polars 쪽 버퍼를 바로 회수하는 게 도움이 된다.

## 회고

이번에 정리한 것들

- 에러 없는 cancelled에 `Futures timed out`이 같이 보이면 OOM을 의심.
- 노드를 키울지 코드를 고칠지는 `psutil`로 단계별 RSS를 찍어서 확인.
- `scan_parquet`을 쓰고도 바로 `.collect()`하면 lazy의 의미가 없음. `collect()`는 가능한 한 늦게, filter/select를 다 적은 뒤에 부르기.

### 한 줄 정리

> `scan` = 주문서 작성, `filter` / `select` = 주문서에 항목 추가, `collect()` = 주문서 제출(이때 실행). 주문서를 다 쓴 뒤 제출하면 필요한 것만 한 번에 받아옴.
