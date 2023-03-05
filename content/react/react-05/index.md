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

```bash
  Const [state, setState] = useState(initialState);    
  # ① Const [변수, Setter] = useState(초기값); 
```

① useState 위와 같은 형태로 선언하여 사용하고 함수형 컴포넌트에서 상태 관리를 할 수 있게 도와준다.

```bash
  function Counter({initialCount}) {
    const [count, setCount] = useState(initialCount);
    return (
      <>
        <div>Count: {count}</div>
        <button onClick={() => setCount(initialCount)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button> # ② 
        <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      </>
    );
  }

  return (
    <>
      <div><Counter initialCount={0} /></div> # ③ Props 전달 
    </>
  )
```
② prev를 이용하여 이전 state값을 사용할 수 있다.   
③ props를 전달할 때는 위와 같이 element에 값을 할당하여 전달한다.

### ❗️ 결과

![react-01.png](react-01.png)   
ㅇ + 버튼 클릭 시 1씩 증가한다.   
ㅇ - 버튼 클릭 시 1씩 감소한다.   
ㅇ Reset 버튼 클릭 시 전달받은 Props 값으로 초기화된다.

---

## 2. useEffect

useEffect는 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 도와준다.

---

## 3. useRef

```bash
const lecture = () => {
  const [number, setNumber] = useState("");
  const inputEl = useRef(null); # ① useRef 선언
  
  const onChange = e => {
    setNumber(e.target.value);
  }

  const onSubmit = e => {
    setNumber('');
    inputEl.current.focus(); # ② .current를 통해 객체 접근하여 함수 사용
  }

  return (
    <>
      <div>
        # ③ DOM에 ref를 사용하여 해당 element 제어
        <input value={number} onChange={onChange} ref={inputEl}></input>
        <button onClick={onSubmit}>제출</button>
      </div>
    </>
  );
};
```
① 다음과 같이 useRef를 선언하여 사용한다.   
> ❗️ 아규먼트로 초기값을 설정할 수 있다. 초기로 설정된 값은 지역 변수 값처럼 사용할 수 있고 렌더링을 일으키지 않기 때문에 렌더링과 관계없는 값을 필요로 할 때 사용한다.

② element를 제어할 때, **변수.current**를 통하여 객체 접근하여 제어할 수 있다.   
③ DOM에 위와 같이 **ref={변수}** 형태로 사용한다.



---

📂 **참고자료**

- [React 공식 문서](https://ko.reactjs.org/docs/hooks-reference.html)
- [VELOPERT님 글](https://velog.io/@velopert/react-hooks)
