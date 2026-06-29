---
title: AWS SAA 덤프 문제를 풀며 정리한 오답 패턴
description: AWS SAA 문제 풀이에서 반복해서 헷갈린 서비스 선택 기준과 오답 포인트를 네트워크, 스토리지, 보안, 운영 영역으로 정리
pubDate: 2026-02-24
category: study
tags:
  - aws
  - certification
  - saa
draft: false
---

AWS SAA 문제를 풀다 보면 틀리는 이유가 비슷하게 반복된다. 서비스 이름을 몰라서 틀리는 경우도 있지만, 대부분은 요구사항의 핵심 단어를 잘못 읽어서 틀린다.

이 글은 덤프 문제를 풀면서 남긴 오답 메모를 다시 묶은 기록이다. 전체 준비 흐름은 [AWS SAA 시험 준비 기록](/blog/aws-saa/)에 정리했다.

## 네트워크와 트래픽

Gateway Load Balancer는 방화벽, 침입 탐지 및 방지, 심층 패킷 검사 같은 가상 어플라이언스를 배포하고 확장할 때 사용한다. 문제에서 "트래픽이 웹 서버에 도달하기 전에 모든 트래픽을 검사한다"는 조건이 나오면 GWLB를 떠올릴 수 있다.

로드 밸런서 선택도 자주 헷갈린다. HTTP/HTTPS 같은 7계층 트래픽이면 ALB가 먼저 후보가 된다. TCP나 UDP 연결을 처리해야 하면 NLB가 더 자연스럽다.

Global Accelerator는 전 세계 사용자에게 고정 Anycast IP를 제공하고, AWS 글로벌 네트워크를 통해 애플리케이션 접근 경로를 최적화할 때 사용한다. 단순한 CDN 캐싱 문제와 구분해야 한다.

## 스토리지와 데이터

대량의 프로덕션 데이터를 EBS로 복제해야 하고 복원 시간을 줄여야 한다면, 스냅샷을 만들고 빠른 스냅샷 복원 기능을 검토할 수 있다. 문제에서 높은 I/O와 복제 시간 최소화가 함께 나오면 이 축으로 읽는다.

S3 Intelligent-Tiering은 접근 패턴이 불규칙한 객체에 적합하다. 접근 빈도를 미리 예측하기 어렵고, 비용 최적화가 필요할 때 후보가 된다.

정적 데이터만 제공하는 웹 서비스라면 S3와 CloudFront 조합이 자연스럽다. 반대로 밀리초 단위 접근과 자동 확장이 핵심이면 DynamoDB가 더 적합하다. RDS는 기본적으로 모든 상황에서 자동 확장되는 서비스가 아니므로, 문제의 확장성 조건을 정확히 읽어야 한다.

## 비용과 비동기 처리

Cost Explorer는 비용과 사용량을 보고 분석하는 도구다. 과거 비용을 보고, 앞으로의 지출을 예측하고, 비용이 많이 발생하는 영역을 찾을 때 사용한다.

대량 데이터를 비동기로 처리하고 확장성을 높여야 한다면 SQS와 Lambda 조합이 자주 등장한다. SQS는 메시지를 버퍼링하고, Lambda는 이벤트 기반으로 작업을 처리한다.

이 조합은 직접 서버를 늘리는 방식보다 운영 오버헤드가 낮다. 문제에 "느슨한 결합", "비동기", "스파이크 흡수" 같은 단어가 있으면 먼저 확인한다.

## 모니터링과 보안

AWS Config는 리소스 구성을 평가하고 변경을 감시하는 서비스다. 예를 들어 S3 버킷이 특정 정책을 따라야 한다면 Config rule로 상태를 검사할 수 있다. Lambda와 결합하면 위반 상태를 자동으로 수정하는 흐름도 만들 수 있다.

CloudTrail은 리소스 설정값 자체보다 계정 안에서 일어난 API 활동 기록에 가깝다. "누가 무엇을 호출했는가"를 확인해야 하면 CloudTrail을 본다.

GuardDuty는 계정과 워크로드의 위협을 탐지하는 보안 서비스다. 대규모 DDoS 방어가 문제의 핵심이면 AWS Shield, 특히 고급 보호가 필요한 경우 Shield Advanced를 검토한다.

## 인증과 계정 구조

SAML은 외부 IdP를 사용해 AWS IAM Role에 임시로 접근하게 하는 표준 인증 방식이다. 회사가 이미 쓰는 IdP를 통해 AWS 콘솔이나 계정에 접근해야 한다면 SAML과 IAM Identity Center를 함께 생각할 수 있다.

AWS Organizations는 여러 AWS 계정을 묶어 관리하는 구조다. 운영, 개발, 보안 계정을 나누고 중앙에서 정책을 적용해야 할 때 등장한다.

Active Directory와 Bidirectional Forest Trust도 계정 통합 문제에서 나온다. 서로 다른 AD Forest 사이에 상호 로그인 신뢰를 설정해야 하는 상황이면 이 개념을 확인한다.

## 문제별 메모

| 문제 | 다시 볼 포인트 |
| --- | --- |
| Q19 | 웹 서버 도달 전 트래픽 검사, Gateway Load Balancer |
| Q20 | EBS 스냅샷, 빠른 복원, 복제 시간 최소화 |
| Q21 | S3 + CloudFront는 정적 콘텐츠, DynamoDB는 밀리초 단위 확장성 |
| Q22 | 접근 패턴이 불규칙하면 S3 Intelligent-Tiering |
| Q24 | 비용 분석과 예측은 Cost Explorer |
| Q25 | 대량 처리와 확장성은 SQS + Lambda |
| Q26 | 구성 감시는 AWS Config, 규칙 위반 자동 수정은 Lambda 연계 |
| Q27 | 외부 IdP와 임시 권한은 SAML, IAM Identity Center |
| Q28 | 여러 계정 접근과 AD 연동은 Organizations, SSO, Forest Trust |
| Q29 | UDP는 NLB, HTTP는 ALB |
| Q33 | 수십만 명 피크 트래픽과 스트리밍 처리는 Kinesis 후보 |
| Q34 | 리소스 구성 변경은 Config, 계정 활동 이력은 CloudTrail |
| Q35 | 위협 탐지는 GuardDuty, DDoS 보호는 Shield Advanced |
| Q37 | Bastion host보다 Systems Manager Session Manager가 운영 오버헤드가 낮을 수 있음 |

오답 노트는 정답을 외우기 위한 자료가 아니다. 같은 조건이 다른 선택지와 함께 나왔을 때, 왜 한 서비스를 고르고 다른 서비스를 버리는지 다시 확인하기 위한 자료다.
