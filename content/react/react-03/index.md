---
title: 자주 사용하는 React Hooks
date: '2023-03-02 00:00:00'
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
        <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button> # ② prevState값 사용
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

```bash
  const Example = () => {
  useEffect(() => {
    console.log("마운트 될 때만 실행");
  }, []);
  # ① useEffect 선언

  return <div>useEffect</div>;
};
```

① useEffect에서 두번째 아규먼트로 빈 배열을 넣어주면 마운트 시에만 실행한다.   
빈 배열이 아닌 다른 값을 넣어주면 그 값이 갱신될 때 useEffect를 재실행한다. 

```bash
  const Example = () => {
  useEffect(() => {
    console.log("마운트 될 때만 실행");
    return () => {
      console.log("뒷정리");
    } # ② 뒷정리 함수 반환
  }, []);
  

  return <div>useEffect</div>;
};
```

②  컴포넌트가 언마운트 되기 전이나 업데이트 되기 직전에 수행하고 싶은 작업이 있으면 뒷정리 함수를 반환해주어야 한다.   
언마운트 때만 뒷정리 함수를 호출하고 싶을 시, 두번째 아규먼트로 빈 배열을 주면 되고, 업데이트 때도 호출하고 싶을 시, 두번째 인자로 갱신되는 값을 넣어주면 된다.

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

### ❗️ 결과

![react-02.png](react-02.png)  
제출 버튼을 클릭해도 focus가 유지된다.

---

## 4. useMemo

```bash
const getSum = numbers => {
  console.log('합계 계산중');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum;
}; # ① 합계를 리턴하는 함수

const lecture = () => {
  const [number, setNumber] = useState("");
  const [list, setList] = useState([]);
  const inputEl = useRef(null);

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onSubmit = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus();
  };

  const sum = () => getSum(list); # ② 함수 호출

  return (
    <>
      <div>
        <input value={number} onChange={onChange} ref={inputEl}></input>
        <button onClick={onSubmit}>제출</button>
        <div>합계: {sum()}</div>
        <ul>
          {list.map((value, index) => (
            <Li key={index} value={value} />
          ))}
        </ul>
      </div>
    </>
  );
```

위와 같이 함수를 작성하고 호출 시, 렌더링이 될 때 마다 함수가 호출된다.

> ❗️ 함수형 컴포넌트는 클래스형과 달리 state의 변화를 감지하여 리렌더링 시, 함수 컴포넌트 자체를 다시 실행하기 때문에 함수가 계속 호출된다.

### ❗️ 결과

![react-03.png](react-03.png)
위와 같이 값 입력 시 마다 값이 갱신되고, 이는 성능 저하로 이어진다.  
이 문제를 해결해 주는 hooks가 **useMemo**이다.

```bash
 const sum = useMemo(() => getSum(list), [list]);
```

위와 같이 useMemo를 선언하고 호출 함수를 감싸준다.  
두번째 인자로 변화 감지 시 값을 갱신할 요소를 대괄호 안에 넣어준다.  
값을 기억했다가 변화를 감지했을 때 새로운 값을 내어주는 방식이다.  
위의 경우 list의 값 변화를 감지했을 때, 값을 갱신한다.

### ❗️ 결과

![react-04.png](react-04.png)

위와 같이 list값 갱신 전까지 값을 갱신하지 않는다.

---

## 5. useCallback

```bash
const onChange = useCallback((e) => { # ① useCallback 사용
  setNumber(e.target.value);
}, []);

const onSubmit = useCallback((e) => { # ① useCallback 사용
  const nextList = list.concat(parseInt(number));
  setList(nextList);
  setNumber("");
  inputEl.current.focus();
}, [number, list]);
```

① 위와 같은 형태로 함수에 useCallback을 사용한다.  
useCallback은 useMemo와 동일하게 성능 최적화를 위해 사용한다.  
useCallback을 사용하면 리렌더링 시, 배열에 설정한 값이 변경되기 전까지 함수를 다시 호출하지 않고 재사용한다.  
useCallback은 useMemo를 좀 더 간단하게 함수에 사용하기 위해 사용한다.

> ❗️ useCallback(fn, deps)은 useMemo(() => fn, deps) 와 같다.

---

## 6. useContext

Props는 기본적으로 부모 컴포넌트가 자식 컴포넌트에게 넘겨준다.  
그러다보니 한참 아래에 있는 자식 컴포넌트에게까지 Props를 전달해주기 위해서는 전달의 전달을 거쳐서 가야한다는 문제점이 발생한다.  
이 문제점을 해결하기 위해, 한번에 Props를 전달할 수 있는 useContext를 사용한다.

```bash
export const AppContext = createContext();
# ① export const 변수 = createContext(initialValue);
```

① 위와 같은 형태로 선언하고 initialValue는 초기값이 필요할 시 넣어준다.

```bash
<AppContext.Provider value={ sum }> # ① 변수.Provider로 사용
  <ul>
    {list.map((value, index) => (
      <Li key={index} value={value} />
    ))}
  </ul>
</AppContext.Provider>
```
① 변수.Privider로 Props를 전달할 하위 컴포넌트를 감싸고 value를 통하여 Props를 전달한다.

```bash
const Context = () => {
  const sum = useContext(AppContext); # ① useContext 선언
  return <div>합계: {sum}</div>
}
```
① 몇번째 자식 컴포넌트인지와 상관없이 부모가 전달해준 Props 값을 사용할 컴포넌트에서 위와 같이 useContext의 아규먼트로 createContext를 선언했던 변수를 import로 가져와 넣어주고 사용한다.
 
---

## 7. useReducer
useReducer는 useState를 대체할 수 있다.   
관리해야할 state가 많아져 조금 더 복잡한 상태 관리가 필요한 경우에 적합하다.

```bash
function reducer(state, action) { # ① reducer 함수 선언
  switch(action) {
    case 'INCREMENT' :
      return { value: state.value + 1 };
    case 'DECREMENT' :
      return { value: state.value - 1 };
    default :
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 }); # ② useReducer 선언

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button> # ③ dispatch 선언
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};
```
① 액션을 받아와 처리할 로직을 짜는 함수이고 보통 switch문으로 분기처리한다.   
② 첫번째 아규먼트에는 reducer함수, 두번째 아규먼트에는 초기값을 넣어준다.   
③ dispatch를 사용하여 action을 발생 시킨다. action을 넣어주면 reducer 함수가 호출된다.

---

📂 **참고자료**

- [React 공식 문서](https://ko.reactjs.org/docs/hooks-reference.html)
- [VELOPERT님 글](https://velog.io/@velopert/react-hooks)
