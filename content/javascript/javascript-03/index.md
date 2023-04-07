---
title: ES6 화살표 함수
date: '2022-04-07 00:00:00'
author: 이용민
tags: javascript
categories: javascript
---

![javascript-logo.png](javascript-logo.png)

보통 자바스크립트 문법은 ES6 이전과 이후로 나뉜다.  
ES6를 기준으로 자바스크립트의 사용법이 크게 바뀌었고, 효율적인 문법들이 많이 등장했다. **화살표 함수**는 그 중 하나이다.

## ✔ 선언

화살표 함수는 function 키워드를 사용하지 않고 => 를 사용하여 간단하게 함수를 선언할 수 있다.

```bash
① 매개변수
() => {...}      // 매개변수가 없을 때
x => {...}       // 매개변수가 1개일 때
(x, y) => {...}  // 매개변수가 여러 개일 때

② return
x => { return x + x } == x => x * x
// 함수의 내용이 단순 return 이라면 생략 가능

```

## ✔ 호출

화살표 함수는 익명으로만 사용할 수 있기 때문에  
함수를 호출할 때는 함수 표현식을 사용해야 한다.

```bash
const num = x => x * x;
num(1);
```

아래와 같이 콜백 함수로도 사용할 수 있다.

```bash
const numArr = [1, 2, 3];
const num = numArr.map(x => x * x);
```

## ✔ this

일반 함수와 비교 했을 때, 화살표 함수와의 가장 큰 차이는 this에 바인딩할 객체의 할당 방식이 다르다는 것이다.  
일반 함수는 this에 바인딩할 객체가 함수 호출 방식에 따라 동적으로 결정되고, 화살표 함수는 정적으로 결정된다.

> ❗️ 화살표 함수의 this는 항상 상위 스코프의 this를 참조한다.

```bash
function Animal(puppy) {
  this.puppy = puppy;
}

Animal.prototype.puppyArr = function (arr) {
  return arr.map(function (compliment) {
    return this.puppy + ' ' + compliment;
  });
}

var candy = new Animal("Candy");
console.log(candy.puppyArr(["great!", "perfect!"]));

> ["undefined great!","undefined perfect!"]
```

위와 같이 콜백 함수를 일반 함수로 선언하면 원하는 결과가 출력되지 않는다.  
그 이유는 [this글](https://slowteady.github.io/javascript/javascript-02/) 에서 다뤘듯이, 콜백 함수의 this에는 기본적으로 전역 객체가 바인딩된다.  
따라서, puppyArr 함수를 호출하면 해당 객체를 찾지 못하여 undefined가 출력되는 것이다.

```bash
function Animal(puppy) {
  this.puppy = puppy;
}

Animal.prototype.puppyArr = function (arr) {
  return arr.map(compliment => this.puppy + ' ' + compliment);
}

var candy = new Animal("Candy");
console.log(candy.puppyArr(["great!", "perfect!"]));

> ["Candy great!","Candy perfect!"]
```

위와 같이 화살표 함수 사용 시, 상위 스코프의 this를 참조하기 때문에 원하는 결과가 출력된다.

## ✔ NO 화살표 함수

그렇다면 사용이 편리한 화살표 함수를 항상 사용하면 될 것 같지만, 그렇지 않다.

① 메소드

```bash
const animal = {
  name: 'Candy',
  sayName: () => console.log(`HEY ${this.name}`)
};

animal.sayName();

> HEY undefined
```

위와 같이 화살표 함수를 메소드로 정의할 경우, this가 메소드를 호출한 객체를 참조하지 않고 그 상위 스코프인 window를 참조하기 때문에 원하는 결과가 출력되지 않는다.

② prototype

```bash
const animal = {
  name: 'Candy',
};

Object.prototype.sayName = () => console.log(`HEY ${this.name}`);

animal.sayName();

> HEY undefined
```

위와 같이 화살표 함수로 메소드를 정의했을 경우와 같은 문제가 발생한다.

③ 생성자 함수

```bash
const Animal = () => {};

console.log(Animal.hasOwnProperty('prototype'));

const animal = new Animal();

> false
> Uncaught TypeError: Animal is not a constructor

```

위와 같이 에러가 출력된다.  
화살표 함수가 prototype 프로퍼티를 가지고 있지 않기 때문에 constructor 객체를 참조할 수 없다.  
따라서, 화살표 함수는 생성자 함수로 사용할 수 없다.

④ addEventListener 함수의 콜백 함수

```bash
var button = document.getElementById('btn');
button.addEventListener('click', () => {
  console.log(this === window);
});

> true
```

위의 결과는 true 가 출력된다.  
addEventListener의 콜백 함수의 내부의 this는 이벤트가 발생한 DOM 요소를 참조하도록 설정된다.  
따라서, 화살표 함수가 아닌 일반 함수를 사용해야 하고 this 대신 event.currentTarget을 사용하는것이 좋다.

---

📂 **참고자료**

- 모던 자바스크립트 Deep Dive 도서
