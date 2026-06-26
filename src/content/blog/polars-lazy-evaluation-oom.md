---
title: 메모리를 안 키우고 OOM을 풀 수 있을까 — Polars lazy evaluation
description: 노드 메모리만 키우면 끝나는 OOM이었지만, 그러지 않고 코드로 해결할 방법이 있는지 파고들며 정리한 Polars lazy evaluation
pubDate: 2026-06-26
category: study
tags:
  - polars
  - lazy-evaluation
  - oom
  - memory
  - data-engineering
---

## 들어가며

대용량 데이터로 모델을 학습하는 노트북이 **중간 셀부터 갑자기 전부 `cancelled`로 뜨는** 일을 겪었다. 원인은 드라이버 메모리 부족(OOM)이었고, 솔직히 **노드 RAM만 키우면 끝나는 간단한 문제**다. 실무에서라면 그게 정답일 때가 많다.

그런데 문득 궁금해졌다. **메모리를 안 키우고, 코드만으로 풀 수 있을까?** 이 질문을 따라가 보니 결국 "메모리는 언제, 왜 터지는가"와 Polars의 lazy evaluation에 가 닿았다. 이 글은 그 공부 기록이다.

미리 핵심만 적으면 이렇다. OOM은 "최종 데이터가 커서"가 아니라 **"데이터를 만들어가는 중간 단계에서 메모리가 부풀어서"** 날 수 있고, Polars의 lazy evaluation은 바로 그 중간 peak을 줄여준다. (물론 최종 데이터 자체가 RAM보다 크다면, 그땐 얌전히 메모리를 키우는 게 맞다 — 이 분기를 어떻게 판단하는지도 뒤에서 다룬다.)

## 증상: 에러도 없이 특정 셀부터 전부 cancelled

노트북을 위에서부터 실행하는데, 데이터를 로드하고 가공하는 어느 셀까지는 멀쩡히 출력이 나오다가, **그 다음 셀부터 끝까지 전부 `cancelled`** 로 표시됐다. 정작 cancelled로 표시된 셀에는 **에러 메시지가 한 줄도 없었다.**

처음엔 타임아웃을 의심했지만, 실행 코드를 따라가 보니 작업에 타임아웃이 걸려 있지 않았다. 그렇다면 남는 가설은 하나다.

> **드라이버에서 Python 프로세스 자체가 죽었다 (OOM kill).**

노트북 커널(Python 프로세스)이 메모리 부족으로 OS에 의해 강제 종료되면, 실행 환경은 **그 순간 돌던 셀과 이후 모든 셀을 일괄 `cancelled`로 표시**한다. 그래서 "에러 없는 cancelled의 연쇄"는 전형적인 OOM 시그니처다.

**교훈 1**: 특정 지점부터 셀이 줄줄이 cancelled되고 에러 메시지가 없다면, 코드 버그보다 **프로세스 OOM**을 먼저 의심하라.

## 왜 하필 "그 셀"이었나 — 메모리가 쌓이는 지점

노트북의 데이터 흐름을 단순화하면 이랬다.

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

죽은 건 (C)였다. 이유는 **그 순간 메모리에 떠 있는 큰 객체의 개수**에 있다.

| 객체    | 정체                              | 메모리 |
| ------- | --------------------------------- | ------ |
| `df`    | 전체 데이터 풀로드                | 큼     |
| `df2`   | `df` + 파생 컬럼 (사실상 또 한 벌) | 큼     |
| `train` | (C)에서 만든 또 한 벌             | 큼     |
| `valid` | (C)에서 만든 또 한 벌             | 큼     |

(A)~(C)를 거치며 **큰 데이터의 복사본이 네 벌까지 동시에** 메모리에 상주한다. 각 단계의 출력은 정상이었지만, (C)에서 마지막 두 벌을 올리는 순간 누적 합계가 드라이버 RAM 천장을 넘겨 OOM이 났다.

**교훈 2**: OOM은 "가장 큰 객체 하나"가 아니라 **같은 시점에 동시에 상주하는 객체들의 합**으로 터진다. 단계마다 출력이 정상이어도, 안 쓰는 중간 객체를 들고 있으면 누적된다.

## 가장 흔한 오해: "어차피 학습엔 다 필요하니 최대 메모리는 같다?"

여기서 내가 막혔던 지점. **"결국 학습에 들어가는 `train`/`valid`의 크기는 똑같은데, 무슨 수를 써도 OOM은 똑같이 나는 것 아니냐?"**

반은 맞고 반은 틀리다. 둘을 구분해야 한다.

- **최종 메모리** = 학습이 실제로 쓰는 `train` + `valid`의 크기. → 어떤 방식이든 동일하다. (이 직관은 맞다)
- **Peak 메모리** = 그 최종 데이터를 *만들어가는 도중* 거쳐가는 최대 사용량. → 방식에 따라 **크게 다르다.**

**OOM은 최종 메모리가 아니라 peak 메모리에서 터진다.** 위 예시도 학습(`train`/`valid`)이 아니라, 그걸 만드는 중간 단계 (C)에서 풀카피 네 벌이 겹쳤을 때 터졌다.

그래서 진짜 질문은 이거다.

> **최종 데이터(`train`+`valid`+학습 중 추가 메모리)가 RAM에 들어오는가?**
>
> - 들어온다 → OOM은 **중간 peak 때문**. peak만 줄이면 해결. (노드 안 키워도 됨)
> - 안 들어온다 → 중간을 아무리 줄여도 결국 터짐. **노드(RAM)를 키워야 함.**

이 판단은 추측이 아니라 **숫자로** 한다. 실제 메모리는 이렇게 찍어 확인할 수 있다.

```python
import psutil, os

proc = psutil.Process(os.getpid())
print(f"현재 프로세스 RAM: {proc.memory_info().rss / 1024**3:.1f} GB")

vm = psutil.virtual_memory()
print(f"전체 RAM: {vm.total / 1024**3:.1f} GB / 가용: {vm.available / 1024**3:.1f} GB")

# Polars 객체 단위 크기
print(f"train: {train.estimated_size('gb'):.1f} GB")
# pandas면: df.memory_usage(deep=True).sum() / 1024**3
```

학습 직전, 데이터 변환 직후에 각각 찍어보면 **어느 단계에서 얼마까지 차오르는지** 한눈에 보인다.

**교훈 3**: "최종 데이터 > RAM"이면 코드 최적화로 안 되고 RAM을 늘려야 한다. "최종 < RAM, 중간 peak > RAM"이면 코드(peak 축소)로 해결된다. **둘 중 뭔지부터 측정으로 확정하라.** 안 그러면 노드 스펙과 코드 최적화 중 헛다리를 짚는다.

## 해결의 핵심: Polars lazy evaluation

위 분석에서 "중간 peak이 문제"라면, 그걸 줄이는 정공법이 Polars의 **lazy evaluation**이다.

### DataFrame(eager) vs LazyFrame(lazy)

Polars엔 데이터를 다루는 객체가 두 종류 있다.

|                           | `DataFrame` (eager)                    | `LazyFrame` (lazy)                     |
| ------------------------- | -------------------------------------- | -------------------------------------- |
| 생성                      | `pl.read_parquet()`, `.collect()` 결과 | `pl.scan_parquet()`                    |
| 데이터가 메모리에         | 있음 (이미 읽음)                       | **없음** (아직 안 읽음)                |
| `.filter()` / `.select()` | 즉시 계산해 새 DataFrame               | 계산 안 하고 **"할 일 목록"에만 기록** |
| 실제 실행                 | 매 연산마다                            | `.collect()` 부를 때 한 번에           |

`scan_parquet`는 파일을 **읽지 않고**, "여길 읽을 것이다"라는 **계획(LazyFrame)** 만 만든다. 이후 `filter`, `select`는 전부 계획에 *기록만* 되고, `.collect()`를 부르는 순간 비로소 실행된다.

### collect()가 정확히 하는 일

`collect()`는 **LazyFrame에 쌓인 쿼리 플랜을 실제로 실행해서 결과 `DataFrame`을 메모리에 만들어 반환**하는 메서드다. (LazyFrame → DataFrame으로 "구체화"되는 시점)

```python
lf = pl.scan_parquet("data/*.parquet")          # 계획만. 데이터 0
lf = lf.filter(pl.col("date") < "2026-05-18")   # 목록에 추가. 아직 실행 X
lf = lf.select(feature_cols)                     # 목록에 추가. 아직 실행 X

df = lf.collect()                                # ← 여기서 처음 실행: 읽고+거르고+컬럼 자르고
```

### lazy가 메모리를 아끼는 두 가지 메커니즘

`collect()`는 실행 직전에 쌓인 계획 전체를 보고 **자동 최적화(query optimization)** 한다. 핵심 둘.

1. **Projection pushdown (컬럼 가지치기)**: `select`로 일부 컬럼만 쓸 걸 미리 아니까, parquet에서 **필요한 컬럼만** 읽는다. (수백 컬럼 → 쓰는 것만)
2. **Predicate pushdown (행 가지치기)**: `filter` 조건을 읽기 단계로 끌어내려, **조건에 맞는 행만** 읽는다.

→ 그래서 "전체"가 아니라 **"걸러지고 잘린 부분집합"** 만 메모리에 올라온다. **peak 자체가 처음부터 작다.**

eager 코드가 메모리를 낭비하는 건 (A)에서 **아무 조건도 안 건 채 `.collect()`를 먼저** 불러서, 최적화할 거리가 없는 상태로 전체를 통째로 올리기 때문이다.

## Before / After

### Before (eager — 풀카피 누적)

```python
df = pl.scan_parquet("data/*.parquet").collect()   # 전체 풀로드
df2 = df.with_columns(pl.col("timestamp").str.slice(0, 10).alias("date"))
train = df2.filter(pl.col("date") < "2026-05-18").select(feature_cols)
valid = df2.filter(pl.col("date") == "2026-05-18").select(feature_cols)
# df, df2, train, valid 네 벌 동시 상주 → OOM
```

### After (lazy — collect를 끝으로 미룸)

```python
lf = pl.scan_parquet("data/*.parquet")             # 계획만 (데이터 0)
lf = lf.with_columns(pl.col("timestamp").str.slice(0, 10).alias("date"))

train = (
    lf.filter(pl.col("date") < "2026-05-18")
      .select(feature_cols)
      .collect()    # ← 걸러진 train만 메모리로
)
valid = (
    lf.filter(pl.col("date") == "2026-05-18")
      .select(feature_cols)
      .collect()    # ← 걸러진 valid만 메모리로
)
```

After 시점의 동시 상주는 `lf`(계획이라 ~0) + `train` + `valid` 뿐. **전체 풀카피(`df`, `df2`)가 아예 존재하지 않는다.**

### 트레이드오프 (공짜는 아니다)

| 항목        | 영향                                                                  | 보통은?                                                |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------------------ |
| 재계산      | `collect`마다 계획 재실행. train·valid 두 번 collect = 파일 두 번 읽음 | 로컬 디스크면 수 초~수십 초, 무시 가능                 |
| 디스크 의존 | 데이터가 메모리가 아니라 파일에 있어야 함                             | 캐시 파일을 **collect 끝나기 전에 지우면 안 됨** (중요) |
| 디버깅      | `collect` 전엔 중간값을 못 본다                                       | 배치 파이프라인이면 영향 적음                          |

성능·정확도(모델 결과) 손해는 **없다.** 같은 결과를 더 적은 peak 메모리로 얻을 뿐이다.

**주의**: lazy로 가면 `scan`이 가리키는 원본 파일을 collect 시점에 읽으므로, **임시 캐시 파일을 collect보다 먼저 삭제하면 안 된다.** (eager 땐 이미 메모리에 올려서 파일을 지워도 됐지만, lazy는 파일을 늦게 읽는다.) `finally`에서 무조건 삭제하던 패턴이 있다면, **읽기 성공 후 삭제**로 바꿔야 한다.

## 정리

- **에러 없는 연쇄 cancelled = 프로세스 OOM 시그니처.** 타임아웃·버그보다 메모리부터 의심.
- **OOM은 최종 데이터 크기가 아니라 중간 peak에서 터진다.** 단계마다 출력이 정상이어도 안 쓰는 객체가 누적되면 합계로 죽는다.
- **"최종 데이터 > RAM"인지 "중간 peak > RAM"인지 먼저 측정으로 확정하라.** 전자는 노드(RAM) 증설, 후자는 코드 최적화가 답. `psutil`로 단계별 RSS를 찍으면 바로 보인다.
- **Polars lazy evaluation(`scan` + 늦은 `collect`)** 은 projection/predicate pushdown으로 필요한 컬럼·행만 읽고, 풀카피 중복 상주를 없애 peak을 낮춘다.
- 핵심 한 줄: **`collect()`는 가능한 한 늦게 (filter/select를 다 적은 뒤에) 불러라.**

### 한 줄 멘탈 모델

> `scan` = 주문서 작성, `filter` / `select` = 주문서에 항목 추가, `collect()` = 주문서 제출(이때 실행). 주문서를 다 쓴 뒤 제출하면, 필요한 것만 한 번에 받아온다.
