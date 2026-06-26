---
title: SAA dump 풀이
description: AWS SAA 덤프 문제 풀이 및 오답 정리
pubDate: 2026-06-24
category: study
tags:
  - aws
  - certification
  - saa
draft: true
---

# Q100

- Q19
	- application + aplliance 통합
	- traffic이 web server에 도달하기 전에 모든 트래픽을 검사하기 위함
	- gateway load balancer를 검사 VPC에 배포
		- Gateway Load Balancer(GWLB) = 방화벽, 침입 탐지 및 방지, 심층 패킷 검사 같은 가상 어플라이언스를 배포, 확장 및 관리
- Q20
	- 높은 I/O로 대량의 프로덕션 데이터를 복제하는 기능 개선(EBS)
	- 복제 시간 최소화
	- 프로덕션 EBS 볼륨의 스냅샷 만들고 스냅샷 복원 기능(속도 향상) 켜기
- Q21
	- S3 + CloudFront = only static data
	- RDS는 기본적으로 Auto scaling이 아님. 따로 켜줘야 함.
	- DynamoDB = 확장성, 액세스 밀리초 단위
		- 용량에 맞게 테이블을 자동으로 조정하므로 별도 관리 필요 없음
- Q22
	- *S3 intelligent-Tiering*
		- 액세스 빈도 및 패턴이 불규칙한 경우 적합한 서비스
- Q23 (O)

- Q24
	- *Cost Explorer*
		- 비용과 사용량을 보고 분석할 수 있는 도구
		- 기본 그래프, Cost Explorer 비용 및 사용량 보고서 또는 Cost Explorer RI 보고서를 사용하여 사용량 및 비용을 탐색할 수 있음
		- 최대 지난 12 개월 동안의 데이터를 보고 향후 12 개월 동안 지출할 가능성이 있는 금액 예측 및 인스턴스 추천
		- 추가 조사가 필요한 영역을 식별 및 비용 이해 가능
- Q25
	- 대량의 데이터 처리 + 확장성 개선 = SQS + Lambda
- Q26
	- *AWS Config*
		- AWS 리소스 구성을 측정, 감사 및 평가할 수 있는 서비스
		- 모니터링
	- *Config rule* = S3가 이런 상태여야한다는 Rule
		- 누군가 설정을 이 Rule에 위반되도록 변경하는지 감시하는게 Config
		- Lambda와 결합해 위반 시 자동 수정하도록 만들 수 있음
	- Configuration = 설정 = 구성 = option = resource의 property 등...
- Q27
	- *SAML* (Security  Assertion Markup Language)
		- 외부 IdP를 사용해 IAM Role에 임시로 접근하게 하는 표준 인증 규격
		- IdP(Identity Provider)는 회사 서버에서 제공
		- 리소스는 AWS가 제공
	- SSO (Single Sign-On)
		- 한 번 로그인으로 여러 시스템을 쓰게 해주는 방식
		- AWS IAM Identity Center
- Q28
	- AWS Organization = AWS 계정 묶음
	- SSO 설정하면 운영, 개발, 보안 계정 모두 접근 가능
	- Active Directory = 직원들이 이미 쓰는 회사 계정
	- Bidirectional Forest Trust = 서로 다른 AD Forest 간 상호 로그인 신뢰하겠다!
- Q29
	- AWS Global Accelerator
	- UDP 연결 = *NLB* (OSI 4 layer)
	- HTTP = *ALB* (OSI 7 layer)
- Q30-Q32
- Q33
	- 피크 시간에 수십만 명의 사용자에게 서비스 제공 = Kinesis
- Q34
	- 리소스 구성 사항 변경 추적 = AWS Config
	- 리소스 내역 기록 = CloudTrail
- Q35
	- *GuardDuty* = 계정 보호 서비스
	- AWS *Shield* / AWS *Shield Advanced*
		- 대규모 DDos 공격에는 Advanced가 적합
- Q36
	- S3 암호화 방식
- Q37
	- PC - *bestion host* - private subnet
		- bestion host는 프라이빗 네트워크에 접속하기 위한 관문 역할
		- 주로 ssh, RDP(remote desktop protocol) 로만 접속 가능
	- bestion host <<< Systems Manager Session Manager가 적은 오버헤드로 더 많이 사용됨
- Q38
-
