---
title: Props & State
date: '2022-02-02 00:00:00'
author: 이용민
tags: react 
categories: react
---

![react-logo.png](react-logo.png)

리액트 컴포넌트에서 데이터는 **Props**와 **State** 두가지를 다룬다.

## Props
props는 부모 컴포넌트가 자식 컴포넌트에게 주는 값이다.   
자식 컴포넌트는 부모 컴포넌트로부터 값을 받아 사용한다.   
props는 직접 수정할 수 없다는 특징이 있다.

```bash
function App() {
  return (
    <div>
      <Hello name="김캔디"/>
    </div>
  );
}
```
으로 name props를 전달하고
```bash
function Hello(props) {
  return <div>{props.name} 입니다.</div>
}
```
실행 시 결과는 
```bash
김캔디 입니다.
```



📂 **참고자료** 
* [VELOPERT님 글](https://velopert.com/3621)
* [생활코딩님 강의](https://www.inflearn.com/course/react-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9/dashboard)