---
title: 협업을 위한 ESLint, Prettier
date: '2023-08-26 00:00:00'
author: 이용민
tags: eslint prettier
categories: work
---

## ✔ 협업을 위한 ESLint, Prettier

![도구](image.png)
이미지 출처: (<https://muhaddis.info/automate-the-code-formatting-with-eslint-and-prettier/>)

### 1. ESLint와 Prettier

#### ❓ESLint와 Prettier를 사용해야 하는 이유

- 프로젝트에 참여하는 개발자들은 각기 코딩 스타일이 다르다.  
그래서 다른 스타일을 가진 개발자가 코드를 보려면 피로도가 증가한다.
- 팀원과의 소통을 통해 어느정도 정할 수 있다고 해도, 그 갯수가 계속해서 증가한다면 한계가 생긴다.  

> **코드 스타일 자동화를 통해 이를 해결할 수 있다. 이를 도와주는 대표적인 도구가 ESLint, Prettier이다.**

### 2. ESLint

- 일관된 코드를 보장해주는 것이 ESLint의 역할이다.
- 코드의 구문을 분석하여 버그 발생의 여지가 있는 코드, 불필요한 코드, 위험성이 존재하는 코드 등에 대한 경고를 출력해준다.

#### 2-1. 설치

```bash
# 개발 환경에서만 사용하기 때문에 --save-dev 옵션을 넣는다.
# CRA로 프로젝트를 시작할 경우, 내장되어 있기 때문에 설치하지 않아도 된다.

npm install eslint --save-dev

# eslint에는 formatting 관련된 rule도 있는데,
# 이 경우 prettier와 다른 설정을 가지고 있다면 설정 충돌이 발생한다.
# 이를 방지하기 위해 eslint-config-prettier를 사용한다.

npm install eslint-config-prettier --save-dev
```

#### 2-2. 설정

- 루트 디렉토리에 **.eslintrc.확장자** 파일을 통해 설정이 가능하다.
- 처음부터 모든 설정을 하는것이 불편하다면 다른 사람들이 정의해준 config 플러그인을 설치하여 사용할 수 있다.

```js
ex)

{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react-hooks"], // 플러그인을 추가한다.
  "extends": [ // 규칙 확장 플러그인을 넣는다.
    "airbnb",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/prettier"
  ],
  "rules":{ // 규칙을 설정한다.
    "no-alert": "off",
    "react/jsx-filename-extension":["warn",{"extensions":[".tsx"]}],
    "import/extensions":[
      "error",
      "ignorePackages",
      {
        "ts":"never",
        "tsx":"never"
      }
  ]
}, 
  "settings":{
    "import/resolver":{
      "typescript":{}
    }
  }
}

```

### 3. Prettier

- 코드의 Formatting을 담당한다.
- 줄 바꿈, 공백, 들여 쓰기 등 에디터에서의 텍스트 일관성을 보장해준다.

#### 3-1. 설치

```bash
# 개발 환경에서만 사용하기 때문에 --save-dev 옵션을 넣는다.

npm install prettier --save-dev
```

#### 3-2. 설정

- 루트 디렉토리에 **.prettierrc.확장자** 파일을 통해 설정이 가능하다.
- 사용가능한 옵션은 (<https://prettier.io/docs/en/options.html>)를 참고한다.

```bash
ex)

{
  "singleQuote": true, // 홑따옴표 사용
  "semi": true, // 세미콜론 사용
  "useTabs": true, // 탭 사용
  "printWidth": 120 // 너비
}
```

---
📂 **참고자료**  

- [jiynn_12님 블로그](https://velog.io/@jiynn_12/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%A1%9C-%ED%98%91%EC%97%85%ED%95%98%EA%B8%B0-Eslint-prettier-husy-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
