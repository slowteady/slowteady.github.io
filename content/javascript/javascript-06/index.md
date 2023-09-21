---
title: 실행 컨텍스트와 클로저
date: '2023-05-13 00:00:00'
author: 이용민
tags: javascript closure
categories: javascript
---

![javascript-logo.png](javascript-logo.png)

## 실행 컨텍스트

실행 컨텍스트는 코드를 실행하는데 필요한 환경을 제공하고 관리한다.
식별자, 스코프, this 등은 **렉시컬 환경**을 통해 관리되고, 코드의 실행 순서는 **콜 스택과 실행 컨텍스트**를 통해 관리된다.  

### 1. 실행 컨텍스트 구성

실행 컨텍스트는 크게 세가지로 구성되어 있다.  

1. 변수 환경(Variable Environment): 컨텍스트 내의 식별자들에 대한 정보, 함수 선언 등이 저장되는 공간
2. 렉시컬 환경(Lexical Environment): 컨텍스트가 속한 렉시컬 스코프(스코프 체인) 정보를 담고 있는 공간, 초기화 과정에서는 변수 환경과 동일하지만, 이후엔 변경사항이 실시간으로 변경된다.  
3. This Binding: this가 바인딩되는 공간, 어떤 객체에 바인딩될 지 결정하는 공간

### 2. 실행 컨텍스트 생성과정

1. 컨텍스트 생성 단계(Execution Context Creation Phase): 실행 컨텍스트가 생성되며, 실행 컨텍스트 구성 요소의 정보가 초기화된다.
2. 코드 실행 단계(Execution Phase): 생성된 컨텍스트에서 코드가 실행된다.
3. 컨텍스트 종료 단계(Tear-down Phase): 코드 실행이 끝나면 해당 컨텍스트는 종료되며, 사용한 메모리 등의 자원이 해제된다.

### 3. 렉시컬 환경

Lexical Environment, 렉시컬 환경은 컨텍스트의 변수 환경과 스코프 체인을 관리하고, 변수와 함수 선언 등의 정보를 담고 있는 객체다.  
함수를 호출할 때 마다 실행 컨텍스트를 생성하게 되는데, 이 때 렉시컬 환경이라는 객체가 생성된다.  
렉시컬 환경에는 Environment Record와 Outer Environment Reference가 존재한다.
> Environment Record: 현재 실행중인 컨텍스트에서 정의한 변수, 함수 정보 등을 가지고 있고 이를 통해 스코프 체인을 생성한다.  
> Outer Environment Reference: 자바스크립트 내부 슬롯이고 외부 실행 컨텍스트를 참조할 수 있게 해주어 스코프 체인이 구성된다.

## 클로저

클로저는 MDN에서 이렇게 정의한다.
> 클로저(Closure)는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

### 1. 정의

```js
function animal() {
  const candy = "Candy";
  const puppy = function () {
    console.log(candy); 
  };
  puppy();
}

animal(); 

> Candy
```

❓ puppy 함수는 어떻게 animal 함수 안에 있는 변수 candy를 참조할 수 있었을까?  

- puppy 함수는 animal 함수 내부에 선언된 내부 함수이다. 내부 함수는 자신이 속한 렉시컬 스코프(전역, animal함수, 자신의 스코프) 를 참조할 수 있다.  

실행 컨텍스트 관점에서 보면  

1. 함수를 호출했을 때, 실행 컨텍스트가 생성된다.
2. 외부 함수에 대한 실행 컨텍스트, 내부 함수에 대한 실행 컨텍스트가 생성되고 내부 함수의 렉시컬 환경에 의해 스코프 체인이 생성되어 외부 함수의 렉시컬 환경을 참조할 수 있다.
3. 이 때, 내부 함수는 외부 함수의 요소를 참조하여 기억할 수 있는 것이고 외부 함수의 실행이 종료되어 실행 컨텍스트가 콜 스택에서 제거 되지만 내부 함수에 의해 요소가 참조되어 있다면 렉시컬 환경은 제거되지 않는다.
4. **가비지 컬렉션**에 의해 참조 여부가 판단되고, 참조되지 않고 있다면 그 때 제거된다.

```js
function animal() {
  const candy = "Candy";
  const puppy = function () {
    console.log(candy); 
  };
  return puppy;
}

const dog = animal();
dog();

> Candy
```

위의 소스를 보면 함수 animal을 호출하면 내부 함수 puppy가 반환되고 animal의 실행 컨텍스트는 소멸된다.  
animal의 실행 컨텍스트가 소멸 되어도 클로저에 의해 animal 함수를 참조할 수 있다.
> 클로저는 외부 환경을 기억하고 있는 함수이다.

클로저의 가장 큰 장점 중 하나는, 함수 내부에 정의된 변수와 함수가 외부에서 접근하지 못하도록 보호한다는 것이다.  
이로 인해 코드의 안정성과 예측 가능성이 높아지며, 코드의 유지 보수성과 확장성이 좋아진다.

---

📂 **참고자료**

- 모던 자바스크립트 Deep Dive 도서
