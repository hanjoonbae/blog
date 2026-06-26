---
title: udemy SAA 필기
description: Udemy AWS SAA 강의 필기 정리
pubDate: 2026-06-24
category: study
tags:
  - aws
  - certification
  - saa
draft: true
---

- **EC2 ssh 접속**
  - pem 파일의 경우 폴더에서 properties - security - user권한을 사용자 1명에게만 귀속시켜야 보안이 인정되어 ssh 접속 가능함
  - 이 때  inheritance는 끄고 USER 만 사용자로 full control로 추가하면 됨
  - 아래는 powershell / cmd 접속 명령어

```
ssh -i .\MyFirstKey.pem ec2-user@3.26.30.58
```

- EC2 **User Data**를 사용하여 실행할 Bash 스크립트를 작성하면, EC2 인스턴스가 시작될 때 필요한 소프트웨어 및 OS 패키지를 자동으로 설치할 수 있다.

  - 이를 통해 수동 작업을 줄이고, 여러 인스턴스에서 일관된 환경을 손쉽게 설정할 수 있다.
- **EC2 Instances 구매 옵션**

  - On-demand (*가장 비쌈*)
  - Saving Plans (*72%*)
    - 초과분은 On-demand로 청구
    - specific instance family, region에 locked
    - Flexible (Instance Size, OS, Tenancy)
  - Reserved Instances(RI)
    - RI (*72%*)
    - Convertible RI (*66%*)
      - 더 자유롭게 RI 설정 컨트롤 가능해서 할인율은 조금 낮음
  - Spot Instances (*90%*)
  - Tenency
    - Dedicated Hosts (*가장 비쌈*)
      - lower level hardware 컨트롤 가능
      - 특정 상용 라이선스를 직접 설치해서 사용할 경우
      - BYOL
    - Dedicated Instances
      - lower level hardware 컨트롤 불가능
      - 라이선스 이슈는 없지만 보안 정책상 다른 고객과 하드웨어 공유하고 싶지 않을 때
    - Capacity Reservations
      - 가용성 보장
      - 약정 없고, On-demand 요금 청구
