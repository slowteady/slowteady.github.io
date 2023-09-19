---
title: 호이스팅
date: '2023-09-19 00:00:00'
author: 이용민
tags: javascript
categories: javascript
---

![javascript-logo.png](javascript-logo.png)

## 호이스팅

이전에 [변수 호이스팅 관련하여 정리한 적](https://slowteady.github.io/javascript/javascript-01/)이 있었는데, 자바스크립트 개념을 다시 공부하면서 이해도가 달라져 다시 정리해야할 필요성을 느꼈다.  
> 이번에는 실행 컨텍스트의 관점에서 정리를 해보았다.

### 1. 실행 컨텍스트

먼저 자바스크립트의 동작을 알기 위해서는 실행 컨텍스트를 알아야한다.  
실행 컨텍스트 관련해서는 [따로 정리](https://slowteady.github.io/javascript/javascript-06/)를 했다.

### 2. 실행 컨텍스트와 호이스팅

```js
console.log(candy);
helloWorld();
function helloWorld() {
  console.log('hello world');
}
var candy = 'candy';
```

위의 코드는 호이스팅에 의해 에러가 아니라

```console
> undefined
> hello world
```

라는 값이 출력된다.

#### 2-1. 자바스크립트 엔진의 동작 순서

자바스크립트 엔진은 **콜 스택**을 통해 코드 실행을 한다.  
콜 스택은 LIFO 방식으로 동작하기 때문에 가장 마지막에 푸시된 컨텍스트가 가장 먼저 실행된다.

1. 엔진이 코드를 읽어 들이면서 전역 실행 컨텍스트를 생성하고 콜 스택에 올린다.
2. 콜 스택이 전역 실행 컨텍스트를 실행하던 도중, 함수 호출문을 만나면 해당 함수의 지역 실행 컨텍스트를 생성하여 콜 스택에 푸시한다.
3. 엔진은 전역 실행 컨텍스트 실행을 멈추고 지역 실행 컨텍스트를 먼저 실행한다.
4. 지역 실행 컨텍스트가 전부 실행되어 콜 스택에서 빠지면, 실행하던 전역 실행 컨텍스트를 마저 실행한다.

#### 2-2. 컨텍스트 실행 순서

콜 스택이 컨텍스트를 실행하면서 변수, 함수의 선언문을 가장 먼저 읽는다.  
읽어서 나온 그 환경을 컨텍스트의 **변수 환경**, **렉시컬 환경**에 등록한다.  

1. 변수, 함수 선언문을 읽고 식별자를 인식하여 메모리를 확보한다.
2. 변수, 함수에 대한 환경을 변수 환경, 렉시컬 환경에 등록한다.
3. 변수를 undefined로, 함수를 객체로 만드는 초기화 단계를 진행한다.
4. 3번을 통해 변화된 환경을 변수 환경, 렉시컬 환경에 등록한다.
5. 런타임 단계에서 값을 할당한다.
6. 5번을 통해 변화된 환경을 렉시컬 환경에만 등록한다.

#### 2-3. 결론

```js
console.log(candy);
helloWorld();
function helloWorld() {
  console.log('hello world');
}
var candy = 'candy';
```

다시 원점으로 돌아가서 실행 컨텍스트 관점에서 실행순서는

1. 전역 컨텍스트가 콜 스택에 푸시되어 실행된다.
2. helloWorld 함수 선언문을 읽고 환경을 변수 환경, 렉시컬 환경에 등록한다.
3. helloWorld 함수를 초기화 후에 환경을 변수 환경, 렉시컬 환경에 갱신한다.
4. var candy 변수 선언문을 읽고 환경을 변수 환경, 렉시컬 환경에 등록한다.
5. var candy 변수를 undefined로 초기화 후에 환경을 변수 환경, 렉시컬 환경에 갱신한다.
6. 런타임 단계에 돌입하여 첫번째 코드 console.log(candy); 를 실행한다. candy는 초기화된 값인 undefined이기 때문에 undefined가 출력된다.
7. helloWorld()를 통해 함수가 호출되고 지역 컨텍스트가 생성되어 콜 스택에 푸시된다.
8. console.log('hello world'); 가 실행되어 출력되고 지역 컨텍스트가 콜 스택에서 제거된다.
9. 실행되던 전역 컨텍스트가 이어서 실행되고 candy 변수에 'candy' 값이 할당된다.
10. 'candy' 값으로 변화된 환경을 렉시컬 환경에만 갱신한다.

> 이렇게 선언부가 먼저 실행되는데, 마치 코드가 끌어올려져 실행된 것 처럼 보인다고 해서 **호이스팅** 이라고 부른다.

### 3. 변수

ES6에서 등장한 const와 let 키워드는 var 키워드와 동작이 다르다.

> const와 let은 변수 초기화 과정이 런타임 때 진행된다.

```js
console.log(candy);
const candy = 'candy';
```

```js
console.log(lee);
let lee = 'lee';
```

위의 두 코드의 실행 결과는 **ReferenceError** 에러가 출력된다.

undefined로의 변수 초기화 과정이 순서대로 코드를 실행시키는 런타임에 진행되기 때문에 변수가 초기화 되지 않은 상태로 사용하게 되고 에러가 발생하는 것이다.

> 따라서, const와 let도 호이스팅 자체는 발생하지만 이로 인해 생기는 버그들을 방지할 수 있는 것이다.

### 4. 함수

함수를 표현하는데 있어

```js
function foo() {}
var foo = function() {}
const foo = () => {}
```

이렇게 여러 방식으로 표현할 수 있다.  
세 방식 모두 호이스팅 자체는 유발된다. 하지만 함수 표현식으로 사용된 두번째, 세번째 방식은 호이스팅으로 인한 버그를 방지할 수 있다.

```js
foo();
function foo() {
  console.log('Hello World');
}
```

위의 코드는 Hello World가 출력된다.  
호이스팅으로 인해 함수 선언문이 먼저 읽혔기 때문에 이렇게 동작이 가능하다.

```js
foo();
var foo = function() {
  console.log('Hello World');
}
```

함수 표현식으로 작성된 위의 코드는 에러가 출력된다.  
호이스팅으로 인해 변수 선언문이 먼저 읽히지만 undefined로 초기화되기 때문에 foo()로 함수 호출을 하면
TypeError 에러가 출력되는 것이다.

```js
foo();
const foo = () => {
  console.log('Hello World');
}
```

위의 코드는 const 키워드로 선언됐기 때문에 ReferenceError가 출력된다.  
그리고 화살표 함수는 함수 표현식이기도 하다.  
그렇기 때문에 호이스팅으로 인한 버그 유발로부터 안전하다.

---
