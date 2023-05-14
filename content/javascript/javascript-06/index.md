---
title: 실행 컨텍스트와 클로저
date: '2023-05-13 00:00:00'
author: 이용민
tags: javascript
categories: javascript
---

![javascript-logo.png](javascript-logo.png)

## ✔ 실행 컨텍스트

실행 컨텍스트, Execution Context는 코드가 실행되기 위해 필요한 환경 정보를 가지고 있는 객체다.  
코드가 실행되기 위해서는 컨텍스트가 필요하고, 컨텍스트 생성 후에 코드가 실행된다.

① 실행 컨텍스트 구성

실행 컨텍스트는 크게 세가지로 구성되어 있다.  

1. Variable Environment: 컨텍스트 내의 식별자들에 대한 정보, 함수 선언 등이 저장되는 공간
2. Lexical Environment: 컨텍스트가 속한 렉시컬 스코프(스코프 체인) 정보를 담고 있는 공간, 초기화 과정에서는 Variable Environment와 동일하지만, 이후엔 변경사항이 실시간으로 변경된다.  
3. This Binding: this가 바인딩되는 공간, 어떤 객체에 바인딩될 지 결정하는 공간

② 실행 컨텍스트 생성과정

1. 컨텍스트 생성 단계(Execution Context Creation Phase): 실행 컨텍스트가 생성되며, 실행 컨텍스트 구성 요소의 정보가 초기화된다.
2. 코드 실행 단계(Execution Phase): 생성된 컨텍스트에서 코드가 실행된다.
3. 컨텍스트 종료 단계(Tear-down Phase): 코드 실행이 끝나면 해당 컨텍스트는 종료되며, 사용한 메모리 등의 자원이 해제된다.

③ 렉시컬 환경

Lexical Environment, 렉시컬 환경은 컨텍스트의 변수 환경과 스코프 체인을 관리하고, 변수와 함수 선언 등의 정보를 담고 있는 객체다.  
함수를 호출할 때 마다 실행 컨텍스트를 생성하게 되는데, 이 때 렉시컬 환경이라는 객체가 생성된다.  
렉시컬 환경에는 Environment Record와 Outer Environment Reference가 존재한다.
> Environment Record: 현재 실행중인 컨텍스트에서 정의한 변수, 함수 정보 등을 가지고 있고 이를 통해 스코프 체인을 생성한다.  
> Outer Environment Reference: 자바스크립트 내부 슬롯이고 외부 실행 컨텍스트를 참조할 수 있게 해주어 스코프 체인이 구성된다.

## ✔ 클로저

클로저는 MDN에서 이렇게 정의한다.
> 클로저(Closure)는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

① 정의

```bash
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

- puppy 함수가 animal 함수 내부에 선언된 내부 함수이므로, 자신이 속한 렉시컬 스코프(전역, animal함수, 자신의 스코프) 를 참조할 수 있다.  
- 실행 컨텍스트 관점에서 보면 puppy의 실행 컨텍스트에서 animal의 상위 컨텍스트를 참조 했기 때문에 변수 candy에 접근이 가능했던 것이고, 이것은 실행 컨텍스트 안에 있는 렉시컬 환경에 의해 가능하다.

```bash
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
> 클로저는 자신이 선언된 렉시컬 환경을 기억하여, 밖에서 호출 되어도 그 환경에 접근할 수 있는 특성이다.

내부함수가 유효한 상태에서 외부함수가 종료하여 외부함수의 실행 컨텍스트가 소멸되어도, 외부함수 실행 컨텍스트 내의 객체는 내부함수에 의해 참조되는 한 유효하여 내부함수가 스코프 체인을 통해 참조할 수 있는 것을 의미한다.

클로저의 가장 큰 장점 중 하나는, 함수 내부에 정의된 변수와 함수가 외부에서 접근하지 못하도록 보호한다는 것이다.  
이로 인해 코드의 안정성과 예측 가능성이 높아지며, 코드의 유지 보수성과 확장성이 좋아진다.

---

📂 **참고자료**

- 모던 자바스크립트 Deep Dive 도서
