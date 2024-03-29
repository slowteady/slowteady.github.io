---
title: 리액트의 최적화
date: '2023-09-02 00:00:00'
author: 이용민
tags: react 최적화 memoization
categories: react
---

![react-logo.png](react-logo.png)

## 리액트의 최적화

### 1. 리액트의 렌더링

리액트의 리렌더링은 state가 변화되었을 때 이루어진다.  
크게 아래의 4단계를 거치게된다.

1. 기존 컴포넌트의 UI를 재사용할 지 확인한다.
2. 함수 컴포넌트: 컴포넌트 함수를 호출한다 / Class 컴포넌트: `render` 메소드를 호출한다.
3. 2의 결과를 통해서 새로운 VirtualDOM을 생성한다.
4. 이전의 VirtualDOM과 새로운 VirtualDOM을 비교해서 실제 변경된 부분만 DOM에 적용한다.

### 2. React.memo

리액트는 컴포넌트의 UI가 변화 되었는지 검증 후에 리렌더링을 실시한다.  
만약 하위 컴포넌트의 state가 변화되지 않았다면 비효율적으로 검증하는 과정을 거칠 필요가 없다.  
> 그래서 리액트는 개발자에게 컴포넌트에 대한 리렌더링 여부를 표현할 수 있는 React.memo 함수를 제공하고 이를 통해 기존의 컴포넌트의 UI를 재사용할 지 판단하는 방법을 채택했다.

React.memo로 감싸진 컴포넌트는 이전 props와 다음 props의 값을 비교하여 차이가 있을 경우에 리렌더링을 실시한다.  
React.memo는 기본적으로 props의 변화를 이전 prop와 새로운 prop를 각각 **shallow compare** 해서 판단한다.  
props는 객체 형태로 표현되고 props 객체는 매 렌더링마다 새롭게 생성되기 때문에 props 객체 자체를 비교하는 것은 무의미하다.  
그렇다면 비교해야 하는 것은 props객체 안의 각 property이다.  

> 따라서 리액트는 props 객체 안의 각 property들을 `Object.is(===)` 연산자를 통해서 비교한다.  
이 중 하나라도 false가 나올 경우 props가 변경되었다고 판단하고 리렌더링을 수행한다.

### 3. Memoization

메모이제이션은 특정 값을 저장했다가 해당 값이 필요할 때 그대로 사용하는 테크닉이다.  
리액트는 매 렌더링마다 함수 컴포넌트를 다시 호출한다.  
같은 값을 사용하는데 매번 함수를 호출하는 것은 비효율적이다.  

> 그래서 리액트에서는 함수 컴포넌트에서 값을 메모이제이션 할 수 있도록 useMemo, useCallback과 같은 함수를 제공해주고 있다.

### ❓ 그렇다면 최적화를 언제 해야할까?

메모이제이션의 개념만 보면 아무때나 사용하면 최적화가 될 것 같은 느낌이 든다.  
하지만 명확한 목적 없는 메모이제이션의 남용은 오히려 비효율적이다.

> 최적화에는 확실하게 비용이 든다.  
충분한 고려와 판단을 통해 최적화 대상을 선별해야 하며 적절한 위치에 사용해야한다.

---
