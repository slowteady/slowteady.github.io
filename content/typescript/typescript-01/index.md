---
title: 타입스크립트 기본개념
date: '2023-05-03 00:00:00'
author: 이용민
tags: typescript
categories: typescript
---

![typescript-logo.png](typescript-logo.png)

## ✔ 사용하는 이유

자바스크립트는 원래 현재처럼 널리 쓰일 용도로 만들어지지 않았다.  
그렇기 떄문에 특이점이 많고 문제가 발생할 소지를 가지고 있다.  
예를 들어, 자바스크립트에서는 null이나 undefined에 값을 곱해도 오류가 출력되지 않는다.  
오류로 출력되지 않기 때문에 처리하기가 까다롭고 이러한 점은 치명적인 오류와 버그로 이어질 수가 있다.  
타입스크립트는 이러한 오류와 버그가 발생하는 것을 방지하기 위해 사용된다.

## ✔ 타입 애너테이션 기초

① 기본 타입 지정

```bash
let pi: number = 3.14549;       // number 타입 지정

let movie: string = "Avengers"; // string 타입 지정

let cup: number = 9;            // number 타입 지정

let question: boolean = false;  // boolean 타입 지정

movie = 1; // Type 'number' is not assignable to type 'string'
```

위와 같이 "변수명: 타입" 의 형태로 변수에 타입을 지정할 수 있다.  
변수에 지정된 타입이 아닌 다른 타입의 값을 할당하려고 하면 오류가 발생한다.

② 함수

```bash
function func(num: number): number {
  return num * num;
}
```

위와 같이 파라미터의 타입과 리턴 타입을 할당할 수 있다.  
선언된 함수의 리턴 타입과 다른 타입의 값을 리턴하는 로직을 구현하거나, 선언된 함수의 타입과 다른 타입의 아규먼트로 호출한다면 오류가 발생한다.

```bash
const func = (num: number, person: string): void => {
  console.log(`${num} ${person}`);
}
```

화살표 함수로는 위와 같이 표현할 수 있고 return이 없다면 void 타입을 넣어준다.


---

📂 **참고자료**

- [유데미 타입스크립트 강의](https://www.udemy.com/share/1073Ug3@-b0NZ_2ntkpPQxEojOh7bZ_Bdk_5cNC7JDGVyKktIJkjkzdPxS-pM6zRv-qY_lfG7w==/)
