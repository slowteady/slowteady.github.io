---
title: React Hooks
date: '2022-03-02 00:00:00'
author: 이용민
tags: react, hooks
categories: react
---

![react-logo.png](react-logo.png)

## React Hooks

React Hooks는 React v16.8 기준으로 등장하여 함수형 컴포넌트에서 다양한 기능을 사용할 수 있게 도와준다.

## 1. useState

useState는 함수형 컴포넌트에서 상태 관리를 할 수 있게 도와준다.

```bash
  Const [state, setState] = useState(initialState);   
  # Const [변수, Setter] = useState(초기값);
```

위와 같은 형태로 선언하여 사용한다.

```bash
  function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
      <>
        <div>Count: {count}</div>
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      </>
    );
  }

  return (
    <>
      <div><Counter initialCount={0} /></div> #Props 전달
    </>
  )
```
> ❗️ prev를 이용하여 이전 state값을 사용할 수 있다.

![react-01.png](react-01.png)   
ㅇ + 버튼 클릭 시 1씩 증가한다.   
ㅇ - 버튼 클릭 시 1씩 감소한다.   
ㅇ Reset 버튼 클릭 시 전달받은 Props 값으로 초기화된다.

## 2. useEffect

useEffect는 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 도와준다.



---

📂 **참고자료**

- [React 공식 문서](https://ko.reactjs.org/docs/hooks-reference.html)
- [VELOPERT님 글](https://velog.io/@velopert/react-hooks)
