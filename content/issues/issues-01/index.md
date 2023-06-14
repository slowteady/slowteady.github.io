---
title: 새로고침과 webpack
date: '2023-06-14 00:00:00'
author: 이용민
tags: react issues webpack
categories: issues
---

## 1. 이슈

React 환경에서 개발 도중 새로고침을 하면

![issues-01.png](issues-01.png)

와 같은 에러가 출력되면서 페이지를 정상적으로 출력하지 못하는 문제가 있었다.

## 2. 원인

404 에러가 출력 되는 것으로 보아, 클라이언트 문제라 판단했고 그 아래의 오류 메세지에서 힌트를 얻을 수 있었다.  
/main/users/bundle.js의 스크립트 실행하는 것을 거부했다는 메세지였다.  
스크립트 파일의 MIME 유형이 application/javascript가 아니라 text/html로 되어 있기 때문에 출력이 어렵다는 메세지이고 **파일 참조가 비정상적으로 되고 있었던 것이 원인이었다.**

## 3. 해결

구글링과 chatGPT, bingCHAT을 이용하여 해결 방법을 찾았고, 해결방법은 webpack 설정에 있었다.

```javascript
  output: {
    path: path.join(__dirname, "dist"), // 빌드하면 만들어질 경로
    filename: "bundle.js", // 파일 이름
  }
```

기존에 사용하던 output 객체에는 path와 filename 프로퍼티만 존재했는데, publicPath를 이용하여 기본으로 참조해야할 path를 지정해주어야 새로고침을 했을 때도 파일이 정상적으로 참조가 되는 것이었다.

```javascript
  output: {
    path: path.join(__dirname, "dist"), // 빌드하면 만들어질 경로
    filename: "bundle.js", // 파일 이름,
    publicPath: "/",
  }
```

위와 같이 설정을 수정하였고 새로고침을 해도 파일이 정상 참조가 되는 것을 확인하였다.

## 4. 회고

webpack 에서의 설정 하나하나는 각각 의미를 가지기 때문에 어떤 역할을 하는지 확실히 파악을 하고 사용해야겠다는 생각이 들었고  
해결을 위한 힌트는 항상 오류 메세지가 먼저 준다는 것을 다시 한번 상기하게 되었다.

---
