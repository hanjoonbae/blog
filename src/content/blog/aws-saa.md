---
title: AWS SAA 시험 준비 기록
description: AWS Solutions Architect Associate를 준비하며 개념 학습, 강의 필기, 문제 풀이를 어떻게 나눠 정리했는지 기록
pubDate: 2026-02-24
category: study
tags:
  - aws
  - certification
  - saa
---

AWS Solutions Architect Associate, 줄여서 SAA는 AWS 서비스를 많이 외우는 시험처럼 보이지만 실제로는 선택 기준을 묻는 시험에 가깝다.

같은 문제 안에서도 S3, EBS, RDS, DynamoDB, SQS, Lambda, CloudFront 같은 선택지가 함께 나온다. 단순히 각 서비스의 정의를 아는 것보다, 어떤 제약 조건에서 어떤 서비스를 골라야 하는지 판단하는 연습이 더 중요하다.

이 글은 SAA를 준비하면서 학습 자료를 어떻게 나눠 봤는지 정리한 기록이다. 강의 필기와 문제 풀이 메모는 별도 글로 분리했다.

## 학습 흐름

처음에는 전체 서비스를 한 번 훑는 데 집중했다. 세부 옵션을 바로 외우기보다, 각 서비스가 어떤 문제를 해결하는지 먼저 잡는 방식이 더 낫다고 봤다.

그 다음에는 Udemy 강의를 보면서 자주 나오는 서비스 조합을 정리했다. EC2, S3, VPC, IAM처럼 기본이 되는 영역은 강의 필기에서 따로 모았다.

마지막으로는 덤프 문제와 오답을 보면서 선택 기준을 좁혔다. 예를 들어 "정적 콘텐츠"가 보이면 S3와 CloudFront를 먼저 떠올리고, "밀리초 단위 확장성"이 나오면 DynamoDB를 후보로 보는 식이다.

## 함께 보는 글

- [AWS SAA Udemy 강의에서 남긴 운영 관점 메모](/blog/aws-saa-udemy/)
- [AWS SAA 덤프 문제를 풀며 정리한 오답 패턴](/blog/aws-saa-dump/)

두 글은 이 글의 하위 노트에 가깝다. Udemy 글은 개념을 처음 잡을 때 남긴 필기이고, 덤프 글은 문제를 풀면서 틀리기 쉬운 지점을 다시 묶은 기록이다.

## 시험에서 자주 묻는 축

SAA 문제는 서비스 이름보다 요구사항을 먼저 읽어야 한다. 특히 아래 축이 반복해서 등장한다.

| 요구사항 | 먼저 떠올릴 것 |
| --- | --- |
| 정적 콘텐츠 배포 | S3, CloudFront |
| 비동기 처리와 확장 | SQS, Lambda |
| 밀리초 단위 키-값 접근 | DynamoDB |
| 리소스 설정 변경 감시 | AWS Config |
| 계정 활동 이력 | CloudTrail |
| 대규모 DDoS 대응 | AWS Shield Advanced |
| 외부 IdP 연동 | SAML, IAM Identity Center |
| HTTP 트래픽 분산 | ALB |
| TCP/UDP 트래픽 분산 | NLB |

이 표만으로 답을 고를 수는 없다. 다만 문제를 읽을 때 처음 후보를 좁히는 데 도움이 된다.

## 준비 방식

개념 학습 단계에서는 각 서비스의 역할을 한 문장으로 설명할 수 있는지를 확인했다. 예를 들어 AWS Config는 "리소스 구성을 평가하고 변경을 감시하는 서비스"이고, CloudTrail은 "계정 안에서 누가 어떤 API를 호출했는지 남기는 기록"이다.

문제 풀이 단계에서는 오답을 서비스별로 모으지 않고, 틀린 이유별로 묶었다. 비슷한 이름 때문에 틀린 것인지, 요구사항의 핵심 단어를 놓친 것인지, 비용과 운영 오버헤드 조건을 잘못 읽은 것인지 구분했다.

이 방식이 좋은 이유는 다음 문제에서 같은 실수를 줄이기 쉽기 때문이다. 단순히 정답만 외우면 선택지가 조금 바뀌었을 때 다시 흔들린다.

## 참고 자료

- [AWS FAQ](https://aws.amazon.com/ko/faqs/)
- [AWS docs](https://docs.aws.amazon.com/)
- [AWS Skill Builder](https://skillbuilder.aws/)
