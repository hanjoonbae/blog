---
title: CORS 에러
aliases:
  - CORS 에러
---

## 한 줄 요약

CORS는 서버 에러라기보다 **브라우저가 다른 출처(origin)의 응답을 JavaScript에게 보여줘도 되는지 검사하는 보안 규칙**이다.

예를 들어 프론트엔드는 `http://localhost:3000`에서 실행되고, 백엔드는 `http://localhost:8080`에서 실행된다고 하자. 둘은 포트가 다르기 때문에 브라우저 입장에서는 다른 출처다. 이때 프론트엔드 코드가 백엔드 API를 호출하면, 브라우저는 백엔드 응답 헤더를 보고 "이 응답을 프론트엔드 JavaScript에 넘겨도 되는가?"를 판단한다.

서버가 허용 헤더를 제대로 보내지 않으면 콘솔에 흔히 이런 에러가 나온다.

```txt
Access to fetch at 'http://localhost:8080/api'
from origin 'http://localhost:3000'
has been blocked by CORS policy
```

중요한 점은 요청 자체가 항상 실패한 것은 아니라는 점이다. 서버까지 요청이 도착했고 응답도 왔지만, 브라우저가 그 응답을 JavaScript 코드에 전달하지 않고 막는 경우가 많다.

## Origin이란

출처(origin)는 아래 세 가지가 모두 같아야 같은 출처로 본다.

```txt
scheme + host + port
```

예시는 다음과 같다.

| URL | `http://localhost:3000`과 같은 출처인가 | 이유 |
| --- | --- | --- |
| `http://localhost:3000/page` | 같음 | scheme, host, port가 모두 같음 |
| `http://localhost:8080/api` | 다름 | port가 다름 |
| `https://localhost:3000` | 다름 | scheme이 다름 |
| `http://127.0.0.1:3000` | 다름 | host가 다름 |
| `https://example.com` | 다름 | scheme, host가 다름 |

개발할 때 프론트엔드와 백엔드를 다른 포트로 띄우면 거의 항상 cross-origin 상황이 된다.

## 왜 CORS가 필요한가

브라우저는 사용자의 쿠키, 세션, 인증 상태를 자동으로 요청에 실을 수 있다. 만약 아무 사이트의 JavaScript나 다른 사이트의 응답을 자유롭게 읽을 수 있다면 문제가 생긴다.

예를 들어 사용자가 은행 사이트에 로그인한 상태에서 악성 사이트에 접속했다고 하자. 악성 사이트의 JavaScript가 은행 API를 호출하고 응답까지 읽을 수 있다면, 사용자의 계좌 정보가 노출될 수 있다.

그래서 브라우저는 기본적으로 **다른 출처의 응답을 JavaScript가 읽는 것을 제한**한다. 서버가 명시적으로 "이 출처는 읽어도 된다"고 허용해야만 브라우저가 응답을 넘겨준다.

## 핵심 헤더

가장 중요한 헤더는 `Access-Control-Allow-Origin`이다.

```http
Access-Control-Allow-Origin: http://localhost:3000
```

이 헤더는 `http://localhost:3000`에서 온 요청에 대해 응답을 읽도록 허용한다는 뜻이다.

모든 출처를 허용하려면 `*`를 쓸 수 있다.

```http
Access-Control-Allow-Origin: *
```

다만 인증 정보인 쿠키, 세션, Authorization header를 함께 다룰 때는 `*`를 쓰면 안 되는 경우가 많다. 이때는 구체적인 origin을 지정해야 한다.

## Simple Request와 Preflight

CORS 요청에는 크게 두 종류가 있다.

첫 번째는 simple request다. 브라우저가 바로 실제 요청을 보낸다. 예를 들어 단순한 `GET` 요청은 대체로 여기에 해당한다.

두 번째는 preflight request다. 브라우저가 실제 요청을 보내기 전에 `OPTIONS` 요청을 먼저 보내서 서버에 물어본다.

```txt
브라우저: 이 origin에서 PUT 요청을 보내도 되나요?
서버: 허용합니다.
브라우저: 그럼 실제 PUT 요청을 보내겠습니다.
```

preflight가 발생하는 대표적인 경우는 다음과 같다.

- `PUT`, `PATCH`, `DELETE` 같은 메서드를 사용할 때
- `Content-Type: application/json`을 사용할 때
- `Authorization` 같은 커스텀 헤더를 보낼 때
- 쿠키나 인증 정보를 포함할 때

그래서 백엔드에서 CORS를 설정할 때는 실제 API 메서드뿐 아니라 `OPTIONS` 요청도 정상적으로 처리해야 한다.

## 자주 보는 원인

### 1. 서버가 origin을 허용하지 않음

프론트엔드는 `http://localhost:3000`에서 요청했는데, 서버가 이 origin을 허용 목록에 넣지 않은 경우다.

```http
Access-Control-Allow-Origin: http://localhost:3000
```

개발 환경과 운영 환경의 도메인이 다르기 때문에, 환경별로 허용 origin을 다르게 관리하는 경우가 많다.

### 2. 허용 메서드가 부족함

브라우저가 `DELETE` 요청을 보내려는데 서버가 `GET`, `POST`만 허용하면 preflight에서 막힌다.

```http
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
```

### 3. 허용 헤더가 부족함

프론트엔드에서 `Authorization` 헤더를 보내는데 서버가 해당 헤더를 허용하지 않으면 막힌다.

```http
Access-Control-Allow-Headers: Content-Type, Authorization
```

### 4. 쿠키를 쓰는데 credentials 설정이 빠짐

쿠키 기반 인증을 사용할 때는 프론트엔드와 백엔드 양쪽 설정이 모두 필요하다.

프론트엔드 `fetch` 예시는 다음과 같다.

```js
fetch("https://api.example.com/me", {
  credentials: "include",
})
```

서버 응답에는 아래 헤더가 필요하다.

```http
Access-Control-Allow-Origin: https://www.example.com
Access-Control-Allow-Credentials: true
```

이 경우 `Access-Control-Allow-Origin: *`는 사용할 수 없다. 반드시 구체적인 origin을 내려줘야 한다.

### 5. API 서버가 아니라 프록시나 배포 환경에서 헤더가 사라짐

로컬에서는 잘 되는데 배포 후 CORS 에러가 나는 경우가 있다. 이때는 애플리케이션 코드뿐 아니라 Nginx, API Gateway, CloudFront, Vercel, Netlify 같은 중간 계층도 확인해야 한다.

중간 계층이 `OPTIONS` 요청을 애플리케이션까지 전달하지 않거나, 애플리케이션이 보낸 CORS 헤더를 덮어쓰면 문제가 생긴다.

## 해결 순서

CORS 에러를 볼 때는 아래 순서로 확인하면 좋다.

1. 브라우저 개발자 도구의 Network 탭을 연다.
2. 실패한 요청이 실제 요청인지 `OPTIONS` preflight인지 확인한다.
3. Request Headers에서 `Origin` 값을 확인한다.
4. Response Headers에 `Access-Control-Allow-Origin`이 있는지 확인한다.
5. 요청 메서드가 `Access-Control-Allow-Methods`에 포함되어 있는지 확인한다.
6. 사용한 헤더가 `Access-Control-Allow-Headers`에 포함되어 있는지 확인한다.
7. 쿠키를 쓴다면 `credentials`와 `Access-Control-Allow-Credentials`를 함께 확인한다.
8. 로컬과 배포 환경의 도메인, 프로토콜, 포트가 다른지 확인한다.

핵심은 "프론트엔드 코드가 틀렸나?"보다 먼저 **브라우저가 어떤 origin으로 요청했고, 서버가 어떤 CORS 헤더로 답했는지**를 보는 것이다.

## Express 예시

Node.js Express에서는 `cors` 미들웨어를 많이 사용한다.

```js
import cors from "cors"
import express from "express"

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)
```

쿠키를 쓰지 않는 공개 API라면 더 단순하게 설정할 수도 있다.

```js
app.use(cors({ origin: "*" }))
```

하지만 실제 서비스에서는 모든 origin을 무조건 허용하기보다, 필요한 프론트엔드 도메인만 명시하는 편이 안전하다.

## Spring Boot 예시

Spring Boot에서는 컨트롤러 단위로 `@CrossOrigin`을 붙일 수 있다.

```java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    // ...
}
```

전역 설정이 필요하면 `WebMvcConfigurer`를 사용한다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
            .allowedHeaders("Content-Type", "Authorization")
            .allowCredentials(true);
    }
}
```

Spring Security를 함께 쓰면 Security 설정에서도 CORS가 막히지 않도록 확인해야 한다. CORS 설정을 해도 인증 필터나 보안 필터에서 `OPTIONS` 요청을 차단하면 여전히 실패할 수 있다.

## CORS와 CSRF는 다르다

CORS와 CSRF는 둘 다 브라우저 보안과 관련이 있지만 목적이 다르다.

CORS는 **다른 출처의 응답을 JavaScript가 읽을 수 있는지**를 통제한다.

CSRF는 **사용자가 의도하지 않은 요청이 인증된 상태로 전송되는 것**을 막는다.

즉 CORS는 "응답을 읽을 수 있나"에 가깝고, CSRF는 "위조된 요청을 실행하게 만들 수 있나"에 가깝다. CORS를 설정했다고 CSRF 방어가 자동으로 해결되는 것은 아니다.

## 흔한 오해

### 서버끼리 호출할 때도 CORS가 필요한가

보통 필요 없다. CORS는 브라우저가 적용하는 정책이다. 백엔드 서버에서 다른 백엔드 서버를 호출하거나, 터미널에서 `curl`로 호출할 때는 브라우저의 CORS 제한을 받지 않는다.

그래서 `curl`로는 성공하는데 브라우저에서는 실패할 수 있다. 이 경우 서버 API 자체가 죽은 것이 아니라 브라우저 CORS 정책에서 막힌 것이다.

### 프론트엔드에서 CORS를 해결할 수 있는가

근본적으로는 서버가 해결해야 한다. 프론트엔드에서 요청 모드나 헤더를 조금 바꿔서 증상을 바꿀 수는 있지만, "이 origin을 허용한다"는 최종 결정은 응답을 보내는 서버가 해야 한다.

개발 중에는 프론트엔드 dev server proxy를 사용해서 같은 출처처럼 보이게 만들 수 있다. 하지만 운영 환경에서는 API 서버나 프록시 계층의 CORS 정책을 명확히 설정해야 한다.

## 정리

CORS 에러를 해결할 때는 다음 문장으로 생각하면 쉽다.

> 브라우저가 다른 origin의 응답을 JavaScript에게 넘기려면, 서버가 응답 헤더로 명시적으로 허락해야 한다.

따라서 문제를 풀 때는 프론트엔드 요청 코드만 보지 말고, Network 탭에서 `Origin`과 CORS 응답 헤더를 같이 확인해야 한다. 특히 preflight `OPTIONS` 요청, 인증 정보 포함 여부, 배포 환경의 프록시 설정을 함께 보면 대부분의 CORS 문제를 좁혀갈 수 있다.
