---
title: Databricks DEA 시험 준비 기록
description: Databricks Certified Data Engineer Associate를 준비하며 Lakehouse, Delta Lake, Spark SQL, Jobs, 권한 관리까지 학습 범위를 정리
pubDate: 2026-04-24
category: study
tags:
  - databricks
  - data-engineering
  - certification
---

Databricks Certified Data Engineer Associate, 줄여서 DEA는 Databricks 위에서 데이터 파이프라인을 만들고 운영하는 기본기를 묻는 시험이다.

단순히 Spark 문법을 외우는 시험이라기보다, Lakehouse 구조에서 데이터를 어떻게 저장하고, 변환하고, 스케줄링하고, 관리할지 묻는 쪽에 가깝다.

이 글은 DEA를 준비하면서 어떤 범위를 우선순위로 볼지 정리한 기록이다.

## 먼저 잡아야 할 축

DEA를 볼 때 가장 먼저 잡아야 하는 축은 Lakehouse다. Databricks는 데이터 웨어하우스와 데이터 레이크를 따로 보는 대신, Delta Lake를 중심으로 저장과 처리를 함께 다룬다.

그래서 시험 준비도 서비스 이름을 나열하는 방식보다 데이터 흐름으로 보는 편이 좋다. 데이터가 들어오고, Delta 테이블에 저장되고, Spark SQL이나 DataFrame으로 변환되고, Jobs로 반복 실행되는 흐름이다.

## 학습 범위

| 영역 | 확인할 내용 |
| --- | --- |
| Lakehouse | 데이터 레이크와 웨어하우스의 역할, Databricks가 합치는 지점 |
| Delta Lake | Delta table, ACID transaction, time travel, schema enforcement |
| Spark SQL | SELECT, JOIN, aggregation, window function, temporary view |
| DataFrame | 기본 변환, 컬럼 처리, lazy evaluation |
| 파이프라인 | batch 처리, incremental 처리, orchestration |
| Jobs | task 구성, scheduling, retry, dependency |
| 클러스터 | cluster mode, autoscaling, runtime 선택 |
| 권한 관리 | workspace permission, table permission, Unity Catalog 기본 개념 |

이 중에서도 Delta Lake와 Jobs는 우선순위가 높다. 데이터 엔지니어링 시험이라는 이름처럼, 데이터를 안전하게 저장하고 반복 가능한 파이프라인으로 만드는 능력이 핵심이다.

## Delta Lake를 보는 법

Delta Lake는 Parquet 파일 위에 트랜잭션 로그를 얹어 안정적인 테이블처럼 다루게 해준다. 그래서 append, update, delete 같은 작업을 더 안전하게 수행할 수 있고, 이전 버전으로 돌아가는 time travel도 가능하다.

시험에서는 Delta가 왜 필요한지 묻는 문제가 나올 수 있다. 단순 파일 저장소와 비교해 ACID transaction, schema enforcement, versioning 같은 키워드를 함께 봐야 한다.

## Spark SQL과 DataFrame

Spark SQL은 SQL에 익숙한 사람이 Databricks에서 데이터를 다룰 때 가장 빠르게 접근할 수 있는 방법이다. SELECT, JOIN, GROUP BY, window function 같은 기본 문법은 자연스럽게 쓸 수 있어야 한다.

DataFrame은 코드 기반 변환에 가깝다. Python이나 Scala로 컬럼을 다루고, 필터링하고, 집계하는 흐름을 이해해야 한다. Spark는 lazy evaluation 기반이므로, transformation과 action의 차이도 같이 봐야 한다.

## 운영 관점

DEA는 노트북에서 한 번 실행되는 코드만 묻지 않는다. Jobs를 통해 작업을 반복 실행하고, 실패했을 때 재시도하고, 여러 task 사이의 의존성을 관리하는 흐름도 중요하다.

클러스터도 마찬가지다. 어떤 runtime을 쓸지, autoscaling을 어떻게 볼지, 작업용 클러스터와 대화형 클러스터를 어떻게 구분할지 확인해야 한다.

권한 관리는 Unity Catalog까지 이어진다. 시험 범위에서 아주 깊게 파고들지는 않더라도, workspace와 table에 접근 권한을 나눠 관리한다는 기본 구조는 잡아야 한다.

## 준비 방식

개념을 처음 볼 때는 Databricks 용어를 하나씩 외우기보다, 실제 파이프라인의 단계에 붙여 보는 편이 좋다.

예를 들어 원천 데이터가 들어오면 어디에 저장할지, 어떤 Delta 테이블로 관리할지, 어떤 SQL이나 DataFrame 변환을 적용할지, 이 작업을 어떤 Job으로 반복 실행할지 순서대로 생각한다.

그렇게 보면 각 기능이 따로 떨어진 암기 대상이 아니라 하나의 데이터 처리 흐름 안에 들어온다.

## 참고 자료

- [Databricks certification overview](https://www.databricks.com/learn/certification)
- [Databricks documentation](https://docs.databricks.com/)
