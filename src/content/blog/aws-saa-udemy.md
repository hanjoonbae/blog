---
title: AWS SAA Udemy 강의에서 남긴 운영 관점 메모
description: AWS SAA 강의를 들으며 EC2 접속, User Data, 인스턴스 구매 옵션처럼 시험과 실무 양쪽에서 자주 나오는 지점을 정리
pubDate: 2026-02-24
category: study
tags:
  - aws
  - certification
  - saa
draft: false
---

AWS SAA 강의를 들을 때는 서비스 이름을 외우는 것보다 "언제 이 선택지가 답이 되는가"를 중심으로 정리하는 편이 낫다.

이 글은 Udemy 강의를 보면서 남긴 메모 중, 시험 문제와 실무 감각 양쪽에 연결되는 내용을 따로 정리한 글이다. 전체 준비 흐름은 [AWS SAA 시험 준비 기록](/blog/aws-saa/)에 정리했다.

## EC2 접속

EC2 인스턴스에 SSH로 접속하려면 키 파일 권한이 먼저 맞아야 한다. 특히 Windows에서 `.pem` 파일을 사용할 때는 파일 속성의 Security 탭에서 현재 사용자만 접근할 수 있도록 권한을 줄여야 한다.

권한이 너무 열려 있으면 SSH 클라이언트가 키 파일을 안전하지 않다고 판단해 접속을 막는다. 이 경우 inheritance를 끄고, 현재 사용자에게만 full control을 주면 된다.

```powershell
ssh -i .\MyFirstKey.pem ec2-user@3.26.30.58
```

이 내용은 시험에 직접 명령어 형태로 나오지는 않을 수 있다. 다만 EC2 접속, 키 페어, 보안 그룹, 퍼블릭 서브넷을 함께 이해하는 데 도움이 된다.

## User Data

EC2 User Data는 인스턴스가 처음 시작될 때 실행할 스크립트를 넣는 기능이다. 보통 OS 패키지를 설치하거나, 웹 서버를 띄우거나, 애플리케이션 설정을 자동화할 때 사용한다.

시험에서는 "여러 인스턴스에 동일한 초기 설정을 반복해야 한다"는 조건으로 자주 등장한다. 수동 접속보다 User Data를 쓰는 편이 운영 오버헤드가 낮다.

핵심은 User Data가 프로비저닝 단계의 자동화 도구라는 점이다. 인스턴스가 이미 실행된 뒤 지속적으로 설정을 관리하는 도구와는 구분해야 한다.

## EC2 구매 옵션

EC2 비용 문제는 할인율만 외우면 틀리기 쉽다. 중요한 것은 워크로드가 얼마나 예측 가능한지, 중단되어도 되는지, 특정 하드웨어를 직접 제어해야 하는지다.

| 옵션 | 적합한 경우 |
| --- | --- |
| On-Demand | 짧게 쓰거나 사용량 예측이 어려운 워크로드 |
| Savings Plans | 일정 사용량을 약정하고 비용을 낮추고 싶을 때 |
| Reserved Instances | 특정 인스턴스 패밀리와 리전 사용이 예측 가능할 때 |
| Convertible Reserved Instances | RI보다 유연성이 필요할 때 |
| Spot Instances | 중단되어도 되는 배치 작업이나 비핵심 워크로드 |
| Dedicated Hosts | 물리 서버 수준 제어, BYOL, 라이선스 요구사항이 있을 때 |
| Dedicated Instances | 하드웨어 공유를 피해야 하지만 호스트 직접 제어는 필요 없을 때 |
| Capacity Reservations | 특정 AZ의 용량을 보장받아야 할 때 |

Spot Instances는 할인 폭이 크지만 언제든 회수될 수 있다. 그래서 상태 저장이 강한 워크로드보다는 배치 처리, 이미지 렌더링, 분산 처리처럼 중단을 감당할 수 있는 작업에 맞다.

Dedicated Hosts와 Dedicated Instances는 이름이 비슷하지만 다르다. Dedicated Hosts는 하드웨어 단위 제어가 가능하고 BYOL 요구사항과 연결된다. Dedicated Instances는 다른 고객과 하드웨어를 공유하지 않는 데 초점이 있다.

## 문제에서 보는 기준

EC2 구매 옵션 문제를 풀 때는 먼저 "비용 최적화"라는 말만 보고 Spot을 고르면 안 된다. 워크로드가 중단되어도 되는지 확인해야 한다.

마찬가지로 "가용성 보장"이라는 조건이 있으면 Capacity Reservations를 떠올릴 수 있다. 반대로 "장기적으로 일정 사용량이 예측된다"면 Savings Plans나 Reserved Instances가 후보가 된다.

이처럼 SAA는 서비스 정의보다 제약 조건을 읽는 시험이다. 강의 필기도 각 기능의 설명보다 선택 기준을 중심으로 남기는 편이 더 오래 남는다.
