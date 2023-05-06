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

(1) 함수 파라미터, 리턴 타입 지정

```bash
function func(num: number): number {
  return num * num;
}

func(1);
```

위와 같이 파라미터의 타입과 리턴 타입을 할당할 수 있다.  
선언된 함수의 리턴 타입과 다른 타입의 값을 리턴하는 로직을 구현하거나, 선언된 함수의 타입과 다른 타입의 아규먼트로 호출한다면 오류가 발생한다.

(2) void 타입

```bash
const func = (num: number, person: string): void => {
  console.log(`${num} ${person}`);
}

func(1, "Thomas");
```

화살표 함수로는 위와 같이 표현할 수 있고 return이 없다면 void 타입을 넣어준다.

(3) never 타입

```bash
function never(): never {
  throw new Error("ERROR");
}
```

never 타입은 절대로 리턴이 없을 경우에 지정하는 타입이다.  
unreachable code가 있다면 사용이 불가능하다.  
따라서, 반환값이 아예 없는 예외 처리의 경우나 무한루프를 도는 로직과 같은 경우에 사용된다.

③ 객체

(1) 함수 파라미터 객채 내의 타입 지정

```bash
function printName(person: { first: string; last: string }): void {
  console.log(`${person.first} ${person.last}`);
}

printName({ first: "Thomas", last: "Jenkins" });
```

위와 같이 객체 내의 타입 지정이 가능하다.

(2) 함수 리턴 객체 내의 타입 지정

```bash
function randomCoordinate(): { x: number; y: number } {
  return { x: 34, y: 2 };
}

randomCoordinate({1, 2});
```

위와 같이 리턴할 객체 내의 프로퍼티에 대해 타입 지정이 가능하다.

(3) 타입 별칭

```bash
type Point = {
  x: number;
  y: number;
};

function doublePoint(point: Point): Point {
  return { x: point.x * 2, y: point.y * 2 };
}

doublePoint({x:1, y:2});
```

위와 같이 객체 리터럴을 선언하듯이, 타입 또한 type 키워드를 사용하여 변수로 선언하여 다룰 수 있다.

(4) 중첩 객체

```bash
type Song = {
  title: string;
  artist: string;
  numStreams: number;
  credits: { producer: string; writer: string };
};

function calculatePayout(song: Song): number {
  return song.numStreams * 0.0033;
}

const mySong: Song = {
  title: "Unchained Melody",
  artist: "Righteous Brothers",
  numStreams: 1234,
  credits: {
    producer: "Phil Spector",
    writer: "Alex North",
  },
};

calculatePayout(mySong);
```

위와 같이 중첩 객체의 프로퍼티에도 타입을 지정하여 사용할 수 있다.

(5) 선택적 프로퍼티

```bash
type Point = {
  x: number;
  y: number;
  z?: number; // 선택적 프로퍼티
};
const myPoint: Point = { x: 1, y: 3 };
```

위의 코드에서 ? 키워드를 사용하면 필수가 아닌 선택적인 프로퍼티로 지정할 수 있다.

(6) readonly

```bash
type User = {
  readonly id: number;
  username: string;
};
const user: User = {
  id: 12345,
  username: "cat",
};

user.id = 123; // Cannot assign to 'id' because it is a read-only property
user.username = "dog";
```

readonly 키워드를 사용하면 객체에 접근하여 값을 변경하지 못하게 할 수 있다.

(7) 교차 타입

```bash
type Circle = {
  radius: number;
};
type Colorful = {
  color: string;
};

type colorfulCircle = Circle & Colorful;
```

& 키워드를 사용하면 교차 타입을 만들 수 있다.

---

📂 **참고자료**

- [유데미 타입스크립트 강의](https://www.udemy.com/share/1073Ug3@-b0NZ_2ntkpPQxEojOh7bZ_Bdk_5cNC7JDGVyKktIJkjkzdPxS-pM6zRv-qY_lfG7w==/)
