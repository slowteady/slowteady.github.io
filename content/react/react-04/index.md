---
title: useState
date: '2022-02-21 00:00:00'
author: 이용민
tags: react
categories: react
---

![react-logo.png](react-logo.png)

## State

Props가 부모 컴포넌트로부터 받아서 사용하는 정적 데이터라면, State는 동적 데이터이다.
컴포넌트는 state의 변화를 감지하여 리렌더링한다.

## useState

리액트 16.8 기준으로 함수 컴포넌트가 상태를 관리할 수 있게 도와주는 React Hooks가 출시되었고 useState함수를 통하여 state를 관리할 수 있게 되었다.

```bash
  import React, { useState } from 'react';

  const Counter = () => {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
      setNumber(number + 1);
    }

    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
      </div>
    );
  }

  export default Counter;
```
+1 버튼을 누를 때 마다 값이 증가하는 Counter 컴포넌트를 만든다고 가정해보자.   
import를 통하여 리액트에서 useState를 가져와 사용한다.

```bash
  const [number, setNumber] = useState(0);
```
number라는 변수와 setNumber라는 Setter를 선언하고 useState(0)로 0이라는 초기값을 
준다. 

버튼 클릭 시, onIncrease 함수를 통해 setNumber라는 Setter에 값이 1 증가한다.   
리액트는 state의 변화를 감지하고 컴포넌트를 리렌더링한다.


```bash
  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1)
  }
```
위 처럼 선언하여 이전 state의 값을 사용할 수도 있다.

> ❗️ 함수 컴포넌트는 state의 변화 감지 시 클래스형 컴포넌트와 같이 render() 메소드만 재실행 하는 것이 아니라, 컴포넌트 자체를 재실행한다.

---

📂 **참고자료**

- [VELOPERT님 글](https://velopert.com/3629)
- [생활코딩님 강의](https://www.inflearn.com/course/react-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9/dashboard)
