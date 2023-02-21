---
title: Start React
date: '2022-01-29 00:00:00'
author: 이용민
tags: react 
categories: react
---

![react-logo.png](react-logo.png)

## 설치
리액트를 사용하기 위해서는 리액트 라이브러리를 설치해야한다.
```bash
npm install -g create-react-app
```
create-react-app 명령어를 통해 리액트에서 제공하는 패키지로 설치를 하게되면 리액트 사용에 도움을 주는 Webpack, Babel등을 하나하나 직접 설치할 필요없이, 한번에 설치할 수 있다.
> 🙋🏻‍♂️ npm 명령어를 사용하기 위해서는 nodeJS를 설치해야하고 node 버전 관리를 편하게 도와주는 nvm을 통하여 설치하는 것을 추천한다!   > [VELOPERT님 글 참고](https://velopert.com/3621)   


## 사용
```bash
create-react-app 프로젝트명
```
create-react-app 명령어를 통해 간단하게 리액트 프로젝트를 생성할 수 있다.

```bash
cd 프로젝트명
npm start
```
를 통해 리액트 프로젝트를 시작할 수 있다.
> 🙋🏻‍♂️ create-react-app으로 리액트 프로젝트 생성 시 Babel, Webpack 등 리액트 프로젝트에 도움을 주는 도구들이 같이 설치된다.   
사용하지 않는 도구가 있다면 create-react-app을 사용하지 않고 직접 프로젝트를 구성하는게 리소스 낭비를 줄인다!

---

📂 **참고자료** 
* [VELOPERT님 글](https://velopert.com/3621)