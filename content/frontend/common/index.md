---
title: 프론트엔드 기초 개념
date: '2023-09-21 00:00:00'
author: 이용민
tags: frontend basic
categories: frontend
---

## 프론트엔드 기초 개념

### 1. 브라우저의 동작 순서

1. HTML 마크업을 처리하고 DOM 트리를 준비한다.
2. CSS 마크업을 처리하고 CSSOM 트리를 준비한다.
3. DOM과 CSSOM을 결합하여 렌더링 트리를 만든다.
4. 렌더링 트리에서 각 요소의 최종 위치와 크기를 계산하는 과정을 거쳐 박스 모델을 생성한다.
5. 화면에 페인팅한다.

### 2. CORS

자바스크립트는 필요한 데이터를 어디서든 받아올 수 있다.  
웹페이지를 만든 서버는 물론이고 다른 서버에서도 당연하게 데이터를 받아올 수 있다.  
이 때, 다른 도메인으로 리소스를 요청하는 것을 `교차 출처 HTTP 요청(Cross-Origin HTTP)` 이라고 한다.  

그런데 교차 출처 HTTP 요청은 보안 문제를 일으킬 수 있다.  
악의적인 의도를 가진 사람들이 이 기능을 이용하여 사용자의 개인 정보를 훔치는 등 데이터를 훔칠 수 있기 때문이다.

그래서 브라우저들은 원칙적으로 정책을 통해 이런 요청을 제한한다.  
이 정책을 `동일 출처 정책(Same-Origin Policy)` 라고 부른다.  
따라서, 기본적으로 자바스크립트는 자신과 같은 출처에서만 데이터를 받아올 수 있다.  

#### ❓ 그럼 어떻게 다른 서버의 데이터를 받아와야할까?

이 때, 필요한 것이 바로 `CORS(Cross-Origin Resource Sharing)`이다.  
CORS는 서버 측에서 설정할 수 있는데, HTTP 헤더 설정을 통해 특정 출처의 웹페이지가 자신의 데이터에 접근할 수 있도록 허용해줄 수 있다.

|           HTTP Header            |          Description           |
| :------------------------------: | :----------------------------: |
|   Access-Control-Allow-Origin    |    접근 가능한 url 설정            |
| Access-Control-Allow-Credentials |    접근 가능한 쿠키 설정            |
|   Access-Control-Allow-Headers   |    접근 가능한 헤더 설정            |
|   Access-Control-Allow-Methods   |    접근 가능한 http method 설정    |

---

📂 **참고자료**

- (<https://github.com/JaeYeopHan/Interview_Question_for_Beginner/blob/master/FrontEnd>)
