---
title: 팝콘 프로젝트 2주차 회고
date: '2023-06-13 00:00:00'
author: 이용민
tags: 프로젝트 회고
categories: etc
---

![insight_boy.png](insight_boy.png)

## ✔ 2주차 회고

생각했던 것 보다 오류와 많이 직면하게 되었다.  
오류 해결에 시간 투자를 많이 했기에 프로젝트 진척도가 떨어졌고  
목표로 정했던 것들을 전부 달성하진 못했다.  
조금 더 집중해서 목표 달성에 힘을 써야겠다는 생각을 했다.

### 1. Did

**① React-Router-Dom v6**  
기존에 사용하던 React-Router-Dom v5버전에서 v6버전으로 마이그레이션을 하게 되었다.  
다뤄보지 않은 v6보다 사용하던 v5의 방식이 익숙했기 때문에 계속 사용하려고 했으나,
mui free 템플릿의 소스를 보고 생각이 바뀌었다.  
템플릿의 라우터 소스를 보고, 중첩 라우팅을 좀 더 효율적이고 직관적인 소스로 관리할 수 있겠다는 생각이 들었다.  
그래서 v6로 마이그레이션을 진행했고 소스를 좀 더 효율적으로 관리할 수 있게 되었다.  
그리고 귀중한 블로그 글들을 참고하여 v6에서는 어떤 점이 달라졌는지 [정리](https://slowteady.github.io/react/react-04/)를 해보았다.

**③ 메인 레이아웃**  
템플릿을 이용하여 메인 레이아웃을 구성했다.  
이미 존재하는 소스를 커스텀하여 구성했는데, 구성할 것이 많았다.  
그리고 반응형으로 구현하다보니 신경쓸 것이 더 많았다.  
Mui에서는 Theme을 사용하여 css를 유동적으로 다룰 수 있는데  
커스텀 Theme을 한번 구축 해놓으면 유동적으로 UI를 표현하기 굉장히 용이할 것 같다는 생각을 했고 템플릿의 소스를 참고하여 구현을 했다.

**③ 로그인 리다이렉트**  
한번 로그인한 사용자가 다시 로그인 페이지를 요청 했을 때, 토큰이 유효하다면 메인 페이지로 자동 리다이렉트를 하는 기능을 구현하고 싶었다.  
라우터를 이용하여 root path인 "/"로 요청 했을 때, 로그인 페이지로 리다이렉트를 시키는 로직이었기 때문에 로그인 페이지에서 useEffect를 이용하여  
토큰을 검증하여 메인 페이지로 리다이렉트 시키면 되겠다고 생각을 했다.  
구현에 성공했고 기능도 정상적으로 동작했지만, useEffect 함수가 렌더링 이후에 동작하기 때문에 로그인 페이지의 UI가 순간적으로 보이는 이슈가 있었다.  
hoc를 하나 만들어서 로그인 페이지의 useEffect에서 처리하던 역할을 대신하게 만들면 될 것 같다는 생각을 했다.

---

### 2. Issues

**① webpack**  
새로고침을 하면 웹팩을 통해 번들링한 파일을 브라우저가 정상적으로 참조하지 못해 404 에러를 출력하는 문제가 있었다.  
웹팩의 설정을 추가하여 해결했고, 이슈에 대해 [정리](https://slowteady.github.io/issues/issues-01/)를 해보았다.  

---