---
title: 타입스크립트 제네릭
date: '2023-05-08 00:00:00'
author: 이용민
tags: typescript
categories: typescript
---

![typescript-logo.png](typescript-logo.png)

## ✔ 사용하는 이유

제네릭은 코드의 재사용성과 유연성을 높이기 위해 사용한다.  
함수나 클래스에서 사용할 타입을 나중에 결정할 수 있도록 허용하며, 동일한 함수나 클래스에서 여러 가지 타입을 다룰 수 있도록 한다.

## ✔ 제네릭 사용법

① 타입 지정

```bash
const nums: Array<number> = []; // = const nums: number[] = [];
const colors: Array<string> = [];
```

위와 같이 제네릭을 이용하여 기본 타입을 설정할 수 있다.

② 빌트인 제네릭  

❓ 빌트인 제네릭이란?
> 타입스크립트에 내장된 제네릭으로, 타입스크립트에서 제공하는 내장 데이터 구조(Array, Promise, map 등)나 함수에서 사용된다.

```bash
const inputEl = document.querySelector<HTMLInputElement>("#username")!;
```

위와 같이 DOM을 제어할 때 Element 타입 지정을 해야한다.

③ 제네릭 작성

함수 호출 타입과 리턴 타입이 같을 때, 제네릭을 이용하면 유용하다.

```bash
function numberIdentity(item: number): number {
  return item;
}
function stringIdentity(item: string): string {
  return item;
}
function booleanIdentity(item: boolean): boolean {
  return item;
}
```

예를 들어, 위와 같이 item 객체를 리턴해주는 로직은 같지만 파라미터와 리턴의 타입이 다른 경우가 있다고 가정했을 때 제네릭을 사용하면 유용하다.

```bash
interface Cat {
  name: string;
  breed: string;
}

function identity<T>(item: T): T {
  return item;
}

identity<number>(7);
identity<Cat>({name: "json", breed: "no"});
```

위에서 T는 타입을 의미하고 넣어주는 타입이 리턴 받는 타입이 된다.  
어떤 타입을 받느냐에 따라 타입이 나중에 결정되기 때문에 가능하다.

④ TSX

화살표 함수로 구현할 때, JSX의 Fragment를 의미하는 <></>의 기호와 제네릭 기호인 <>와 혼동될 수 있다.
따라서, TSX 환경에서는 제네릭의 <> 기호에 후행 쉼표를 붙여 구분한다.

```bash
const getRandomElement = <T,>(list: T[]): T => {
  return list[0];
}
```

위와 같이 표현하여 제네릭을 사용할 수 있다.

---

📂 **참고자료**

- [유데미 타입스크립트 강의](https://www.udemy.com/share/1073Ug3@-b0NZ_2ntkpPQxEojOh7bZ_Bdk_5cNC7JDGVyKktIJkjkzdPxS-pM6zRv-qY_lfG7w==/)
