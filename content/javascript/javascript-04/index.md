---
title: 비동기와 Promise, async / await
date: '2023-04-15 00:00:00'
author: 이용민
tags: javascript
categories: javascript
---

![javascript-logo.png](javascript-logo.png)

자바스크립트에서의 비동기란 로직이 끝날 때 까지 기다리지 않고 다음 코드를 실행하는 것을 말한다.

## ✔ 사용하는 이유

비동기를 사용하는 이유는 일을 처리하는 속도가 향상되기 때문이다.  
비동기를 사용하지 않는다면, 시간이 오래 걸리는 일을 진행하는 동안
아무것도 하지 못하고 기다려야한다.

비동기를 사용하면 시간이 오래 걸리는 일을 진행하도록 두고,
그 다음 일을 처리하기 때문에 일을 병렬적으로 처리하여 처리 속도가 향상된다.

## ✔ 비동기의 문제점

```bash
function ajax() {
 $.get('https://jsonplaceholder.typicode.com/todos/1', function(res) {
  let data; 
  data = res;
 });
  return data;
}

console.log(ajax());

> Uncaught ReferenceError: data is not defined 
```

위와 같이 동작하면 에러가 발생한다.  
ajax의 일이 언제 끝나는지 모르기 때문에 일의 처리 순서를 보장 받을 수 없기 때문이다.  
**비동기의 문제점은 바로 일의 처리 순서를 보장 받을 수 없다는 것이다.**

## ✔ 콜백 함수

위의 문제를 해결하기 위해서 콜백 함수를 사용한다.

```bash
function ajax(callback) {
 $.get('https://jsonplaceholder.typicode.com/todos/1', function(res) {
   callback(res);
 });
  return data;
}

ajax(function(callback) {
  console.log(callback);
});

> {...}

```

콜백 함수를 이용하면 일이 끝난 후에 함수를 실행 시키기 때문에 실행 순서를 보장 받을 수 있다.  
따라서 위와 같이 콜백 함수를 활용하면 일이 끝났을 때 원하는 동작을 실행시킬 수 있다.

## ✔ 콜백 함수의 문제점

```bash
$.get('url', function(res) {
 getData(res, function(id) {
  getAuth(id, function(auth) {
   getToken(auth, function(token) {
    console.log(token);
   });
  });
 });
});
```

꼬리의 꼬리를 무는 방식으로 일을 처리해야 한다면 콜백 함수를 위와 같이 사용해야한다.  
이는 가독성도 좋지 않고 로직 변경도 어렵다.  

![콜백지옥](cbhell.jpeg)

유명한 짤이 있을 정도로 콜백 지옥은 문제점이 있었다.

## ✔ Promise

ES6에서 Promise 키워드가 등장했다.  
Promise 키워드를 사용하여 상태를 리턴 받아, 일이 끝났을 때의 일 처리 순서를 보장 받을 수 있다.

```bash
function ajax(callback) {
  return new Promise(function(resolve, reject) {
    $.get('https://jsonplaceholder.typicode.com/todos/1', function(res) {
      if (res) {
        resolve(res);
      }
      reject(new Error('Error'));
    });
  });
}

ajax().then(function(data) {
  console.log(data); 
}).catch(function(err) {
  console.log(err);
});

```

new Promise를 사용하여 프로미스를 사용할 수 있다.  
프로미스에는 처리 상태라는 것이 존재한다.

① Pending  
대기 상태라는 것을 의미하고, 비동기 처리 로직이 완료되지 않았다는 것이다.

```bash
new Promise();
```

위와 같이 프로미스 메소드를 호출하면 Pending 상태에 들어간다.

```bash
new Promise(function(resolve, reject) {});

```

콜백 함수를 선언할 수 있고, 인자는 resolve, reject가 들어간다.

② Fulfilled
이행 상태라는 것을 의미하고, then 키워드를 사용하여 리턴 값을 받을 수 있다.

```bash
new Promise(function(resolve, reject) {
  resolve();
});
```

위와 같이 resolve()를 호출하면 Fulfilled 상태가 된다.  

```bash
function getData() {
  return new Promise(function(resolve, reject) {
    const data = 'Hello World';
    resolve(data);
  });
}

getData().then(function(returnData) {
  console.log(returnData);
});

> Hello World
```

위와 같이 then을 이용하여 이행 된 결과 값을 리턴 받을 수 있다.

③ Rejected
실패 상태라는 것을 의미하고, 문제가 생겼을 때 Rejected 상태가 된다.

```bash
new Promise(function(resolve, reject) {
  reject();
});
```

위와 같이 reject()를 호출하면 Rejected 상태가 된다.

```bash
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("FAIL"));
  });
}

getData().then().catch(function(err) {
  console.log(err); 
});

> Error: FAIL
```

위와 같이 실패 상태의 결과 값을 catch를 통해 리턴 받을 수 있다.

> Promise를 사용하여 resolve와 reject로 결과 값을 리턴 받아, then과 catch를 사용하여 성공, 실패의 분기처리를 하는 것이 기본적인 사용법이다.

## ✔ async / await

이후에 ES8에서 async / await가 등장했다.  
async / await 또한 비동기 처리를 위한 키워드이고, 가독성이 좋고 비동기 처리를 더 쉽게 할 수 있다는 장점이 있다.

```bash
function ajax() {
  return new Promise(function(resolve, reject) {
    const items = [1,2,3];
    resolve(items);
  });
}

async function getItems() {
  const items = await ajax();
  console.log(items); 
}

getItems();

> [1, 2, 3]

```

위와 같이 콜백 함수를 사용하지 않고 훨씬 간편하게 비동기로 처리할 수 있다.  
> await 키워드를 일 처리 리턴 값을 받을 함수 앞에 붙이고, async를 await 키워드를 사용하는 함수에 붙여서 사용한다.  
**단, await 키워드는 Promise를 리턴 받는 함수에만 사용 가능하다.**

### ❓ 그렇다면 예외 처리는 어떻게 하지?

then과 catch를 사용하여 성공, 실패를 분기 처리 했던 것 처럼 async / await를 사용하면 예외 처리는 try-catch문을 사용해서한다.

```bash
async function getItems() {
  try {
    const items = await ajax();
    if(items.id == 1) {
      const auth = await getAuth();
      console.log(auth.token);
    }
  } catch (error) {
    console.log(error);
  }
}
```

위와 같은 형식으로 try-catch 문을 사용하여 예외 처리를 한다.  
try-catch문을 사용하여 예외 처리를 했을 때의 장점은 네트워크 통신 오류뿐만 아니라 일반적인 오류도 catch문을 통해 잡아낼 수 있다는 것이다.

---

📂 **참고자료**

- [캡틴판교님 글](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
