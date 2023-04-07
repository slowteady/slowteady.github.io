---
title: 자바스크립트 this
date: '2022-04-01 00:00:00'
author: 이용민
tags: javascript
categories: javascript
---

![javascript-logo.png](javascript-logo.png)

자바스크립트에서 정말 많이 사용되는 this 키워드.  
정작 사용할 때는 개념을 이해하지 못한채로 쓴 적이 많은 것 같다.  
this를 잘 다루기 위해서 개념을 정립해본다.

## this

① 자바스크립트의 this는 함수가 호출될 때, 암묵적으로 전달 받는다.

```bash
function plus(number) {
  console.log(this);

  return number * number;
}
plus(2);

> Window
```

② this는 함수 호출 방식에 따라 this에 바인딩되는 객체가 달라진다.  
어떤 방식으로 함수를 호출하느냐에 따라 this의 바인딩 할 객체가 동적으로 정해진다는 얘기다.

## 함수 호출

전역 객체는 모든 객체의 최상위 객체를 의미하고  
this는 기본적으로 전역 객체 window에 바인딩된다.  
따라서, 전역으로 선언한 함수는 전역 객체의 메소드이다.

```bash
var global = "im global";

console.log(global);
console.log(window.global);

function a() {
  console.log(this);
}

window.a();

> im global
> im global
> Window
```

글로벌 영역에 변수, 함수를 선언하고 호출하면 전역 객체에 접근 가능한 변수 window를 사용하여 호출한 것과 같다.

내부함수, 메소드 내부의 함수, 콜백함수의 this도 기본적으로 전역 객체에 바인딩되기 때문에
window를 참조한다.

① 내부함수

```bash
function a() {
  console.log("a this", this);

  function b() {
    console.log("b this: ", this);
  }

  b();
}
a();

> a this: Window
> b this: Window
```

내부함수는 일반함수, 메소드, 콜백함수 어디에서 선언되었든, this는 전역 객체를 바인딩한다.

② 메소드 내부의 함수

```bash
var value = 1;

var obj = {
  value: 100,
  a: function() {
    console.log("a this: ", this);
    console.log("a value: ", this.value);

    function b() {
      console.log("b this: ", this);
      console.log("b value: ", this.value);
    }

    b();
  }
};

obj.a();

> a this: obj
> a this: 100
> b this: Window
> b this: 1
```

③ 콜백함수

```bash
var value = 1;

var obj = {
  value: 100,
  a: function() {
    setTimeout(function() {
      console.log("this: ",  this);
      console.log("value: ",  this.value);
    }, 100);
  }
};

obj.a();

> this: Window
> value: 1
```

## 메소드 호출

객체의 프로퍼티 값이 함수이면 메소드로 호출된다.  
이 때 메소드 내부의 this는 메소드를 소유한 객체에 바인딩된다.

```bash
var animal = {
  name: 'Candy',
  sayName: function() {
    console.log(this.name);
  }
}

var flower = {
  name: 'Jasmin'
}

flower.sayName = animal.sayName; // 메소드 주입

animal.sayName();
flower.sayName();

> Candy
> Jasmin
```

메소드를 호출하는 각각의 객체가 다르기 때문에 각 객체의 name 프로퍼티로 출력된다.

## 생성자 함수 호출

생성자 함수로 함수를 호출했을 때는, 함수 호출과 메소드 호출과는 this의 바인딩이 다르다.  
생성자 함수는 new 라는 키워드를 사용해서 호출하고 빈 객체 생성과 this 바인딩을 진행한다.

```bash
function Animal(name) {
  this.name = name;
}

var myPuppy = new Animal('Candy'); // 생성자 함수 호출

console.log(myPuppy.name);

> Candy
```

따라서 this는 생성자 함수가 생성한 객체에 바인딩된다.

### ❓그럼 명시적으로 this에 객체를 바인딩해서 유연하게 this를 사용할 수는 없을까?

> apply/call/bind 함수를 사용하여 this에 객체를 바인딩 시킬 수 있다.

① apply  
함수명.apply(thisArg, [argsArray]) 의 문법으로 사용한다.

```bash
var animal = function (name) {
  this.name = name;
};

var a = {};
animal.apply(a, ['Candy']);

console.log(a);

> { name: 'Candy' }
```

apply 메소드를 통하여 this에 a 객체를 바인딩하고, 아규먼트를 통하여 프로퍼티에 값을 할당했다.

② call  
call 메소드는 apply 메소드와 기능이 동일하다.  
차이점은 배열로 넘기던 인자를 각각 하나의 인자로 넘긴다는 것이다.

```bash
numberFunc.apply(a, [1, 2, 3]);

numberFunc.call(a, 1, 2, 3);
```

③ bind  
bind 메소드는 인자로 전달한 this가 새로운 함수를 리턴한다.

```bash
var animal = {
  name: 'Candy',
  sayName : function() {
    setTimeout(function() {
      console.log("이름은 " + this.name + " 입니다");
    }, 500);
  }
};

animal.sayName();

> 이름은 undefined 입니다.
```

결과값이 의도한대로 올바르게 출력되지 않는다.  
메소드 내부의 함수는 this에 전역 객체를 바인딩 하기 때문이다.  
이러한 경우에 bind 메소드를 사용하면 this에 animal 객체를 바인딩 시킬 수 있다.

```bash
var animal = {
  name: 'Candy',
  sayName : function() {
    setTimeout(function() {
      console.log("이름은 " + this.name + " 입니다");
    }.bind(this), 500);
  }
};

animal.sayName();

> 이름은 Candy 입니다.
```

### ❓화살표 함수에서는 this가 다르다던데?

> 화살표 함수의 가장 큰 특징이다.  
> 함수 호출에 따라 this에 바인딩할 객체가 동적으로 결정되는 일반 함수와 달리, 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.  
> ✔ [화살표 함수 글](https://slowteady.github.io/javascript/javascript-03/)

---

📂 **참고자료**

- 모던 자바스크립트 Deep Dive 도서
