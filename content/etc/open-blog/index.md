---
emoji: ๐
title: ๋ธ๋ก๊ทธ ์์ฑ๊ธฐ with Gatsby
date: '2022-01-23 00:00:00'
author: ์ด์ฉ๋ฏผ
tags: ๋ธ๋ก๊ทธ github-pages gatsby 
categories: etc
---

![open-blog-1.png](open-blog-1.png)

์ต๊ทผ์ ๊ฐ๋ฐ ๋ธ๋ก๊ทธ์ ํ์์ฑ์ ๋๊ผ๋ค.

๋ฆฌ์กํธ ๊ณต๋ถ๋ฅผ ์์ํ๋ฉด์ ๋จธ๋ฆฟ์์ ์๋ก์ด ๊ฐ๋๋ค์ด ์ค๊ตฌ๋๋ฐฉ์ผ๋ก ํผ์ ธ์์ด์ ๊ฐ๋์ด ์ ๋ฆฝ๋์ง ์์๋ค.

์ ํํ ์ดํด๋ฅผ ์ํด ์ค๊ฐ์ค๊ฐ ์ ๋ฆฌ๋ฅผ ํด์ผํ  ํ์์ฑ์ ๋๊ผ๊ณ , ๋ธ๋ก๊ทธ๋ฅผ ํด์ผ๊ฒ ๋ค๋ ์๊ฐ์ด ๋ค์๋ค.

***

## 1. Github Pages & Gatsby

์ ๋ง ๋ง์ ๋ธ๋ก๊ทธ ํ๋ซํผ์ด ์๋ค. ๋ธ์, ํฐ์คํ ๋ฆฌ, ๋ฒจ๋ก๊ทธ ๋ฑ๋ฑ

์ทจํฅ๊ป ๊ณ ๋ฅผ ์ ์๊ฒ ๊ฐ๊ฐ ํน์์ด ์์๋ค.

๊ทธ์ค์ ๋ด๊ฐ ๊ณ ๋ฅธ ํ๋ซํผ์ ๊นํ ๋ธ๋ก๊ทธ์ด๋ค.

์ ํด์ง ๋ฒ์ ๋ด์์์ ์ปค์คํ์ด ์๋ ์ ์ฒด๋ฅผ ์ปค์คํ ํ  ์ ์๋ค๋ ์ , ์์ค๋ฅผ ํํํ๊ธฐ ์ฝ๋ค๋ ์ ์ด ๋งค๋ ฅ์ ์ด์๋ค.

๊นํ ํ์ด์ง์ค์์ ํธ์คํ ์๋น์ค๋ฅผ ์ ๊ณตํ๊ธฐ ๋๋ฌธ์ ๊ตฌ์ถ์ด ์ด๋ ต์ง ์์๋ค. ๐

๊นํ ํ์ด์ง์ค๊ฐ ํธ์คํ ์๋น์ค๋ฅผ ์ ๊ณตํ๋ ํ์ด์ง ํ์ผ๋ค์ ๋ง๋ค์ด์ฃผ๋ฉด ๋๋๋ฐ, ์ ์  ์ฌ์ดํธ ์์ฑ๊ธฐ๋ฅผ ์ด์ฉํ๋ฉด ๋ณด๋ค ํธํ๊ฒ ํ์ผ์ ์์ฑํ  ์ ์๋ค.

๋ํ์ ์ผ๋ก Jekyll๊ณผ Gatsby๊ฐ ์๋ค.

์งํฌ์ Ruby๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๊ณ  ๊ฐ์ธ ๋น๋ React์ GraphQL๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ๋์ํ๋ค.

ํ์ต์ค์ธ ๋ฆฌ์กํธ๋ฅผ ์ฌ์ฉํ  ๊ธฐํ๋ ์๊ณ  ๋๋ง์ ๋์์ธ์ผ๋ก ์ด๋ฃจ์ด์ง ๋ธ๋ก๊ทธ๋ฅผ ๋ง๋ค์ด ๋ณผ ์์ฌ๋ ์์ด์ ๊ฐ์ธ ๋น๋ฅผ ์ ํํ๋ค.

*** 

## 2. ์ค์น
### 2-1. Template ์์ฑ
์ด๋ฏธ ๋ค์ํ ํํ๋ฆฟ๋ค์ด ํจํค์ง๋ก ๋ง์ด ๋์์๋ค.
์ง๊ธ์ ๋น ๋ฅด๊ณ  ๊ฐ๋จํ๊ฒ ์ฌ์ฉํ๊ณ  ์ถ๊ธฐ ๋๋ฌธ์ ํํ๋ฆฟ์ ์ด์ฉํ๋ค. 

[์ค์ฝ๋ฉ](https://github.com/zoomkoding/zoomkoding-gatsby-blog)๋์ ํํ๋ฆฟ์ด ๋ง์์ ๋ค์ด์ ์ฌ์ฉํ๋ค.   

> ๐๐ปโโ๏ธ ์ค๋๋ ํํ๋ฆฟ ์ฌ์ฉ ์, package.json์ dependency๋ผ๋ฆฌ ์ถฉ๋์ด ์ผ์ด๋ ์ค๋ฅ๊ฐ ์๊ธธ ์ ์๋ค.   
> ์ด ๊ฒฝ์ฐ, ๋ฒ์ ์ ํ๋์ฉ ๋ง์ถฐ๊ฐ๋ฉด์ ์์ ํด์ฃผ๊ฑฐ๋ npm์ --force ์ต์ ๋ฑ์ ์ด์ฉํ์ฌ ํด๊ฒฐํด์ผํ๋ค.

๋ค๋ฅธ ์คํ์ผ์ ํํ๋ฆฟ์ ์ํ๋ค๋ฉด [Gatsby Starters](https://www.gatsbyjs.com/starters)๋ฅผ ์ด์ฉํ๋ฉด ๋๋ค.

ใ **ํํ๋ฆฟ ์ค์น**
```bash
npm install gatsby-cli
gatsby new blog-start https://github.com/zoomkoding/zoomkoding-gatsby-blog
```

ใ **npm start**
```bash
cd blog-start
npm start
```

### 2-2. Repository ์์ฑ
**${github_id}.github.io**  ์ ํํ๋ก ๋ ํฌ์งํ ๋ฆฌ๋ฅผ ์์ฑํ๋ค.

![open-blog-2.png](open-blog-2.png)

### 2-3. git push
๋ด ๋ ํ์งํ ๋ฆฌ์ push๋ฅผ ํด์ค๋ค.
```bash
git add .
git commit -m "blog start"
git remote add origin https://github.com/${github_id}/${repository_name}.git
git push -u origin main
```
***

## 3. ๋ฐฐํฌ
๊นํ ํ์ด์ง์ค๋ก ๋ฐ๋ก deploy ์ํค๋ฉด ์ปดํ์ผ๋ ํ์ผ๋ค๋ก ๋ฎ์ด ์์์ง๊ธฐ ๋๋ฌธ์ branch๋ฅผ ๋ง๋ค์ด์ผํ๋ค.

ใ **gh-pages ์ค์น**
```bash
npm install gh-pages --save-dev
```

ใ **package.json์ script ์ถ๊ฐ** 
```json
{
  "scripts": {
    "deploy": "gatsby build && gh-pages -d public" 
  }
}
```
ใ **๋ช๋ น ์คํ**
```bash
npm run deploy
```
๋ฅผ ์ฌ์ฉํ์ฌ ๋ฐฐํฌํ  ์ ์๋ค.

## 4. ๋ฐฐํฌ ์๋ํ
npm run deploy ๋ช๋ น์ด๋ฅผ ํตํด ๋ฐฐํฌํ  ์ ์์ง๋ง
์์  ํ  ๋ ๋ง๋ค ๋ช๋ น์ ์คํํด์ฃผ๊ธฐ์๋ ์๊ทผํ ๊ท์ฐฎ๊ณ  ๋ฒ๊ฑฐ๋กญ๋ค.

Github Action์ ํตํ์ฌ ๋ฐฐํฌ ์๋ํ๋ฅผ ํด์ฃผ๋ฉด, ์ปค๋ฐ ํ  ๋ ๋ง๋ค ์๋์ผ๋ก ๋ฐฐํฌ๊ฐ ๋๋ค.

**settings > Developer settings > Tokens** ๋ฉ๋ด๋ก ๊ฐ๋ค.

![open-blog-3.png](open-blog-3.png)

**Generate new token > repo** ๋ถ๋ถ์ ์ฒดํฌ ํ ํ ํฐ์ ์์ฑํ๊ณ  token value๋ฅผ ๋ณต์ฌํ์ฌ ์ ์ฅํ๋ค.
> ๐๐ปโโ๏ธ token value๋ ์ฌ๋ฐ๊ธ์ด ์๋๊ธฐ ๋๋ฌธ์ ๊ผญ ๋ณต์ฌํด์ผํ๋ค!!

![open-blog-4.png](open-blog-4.png)

**๋ธ๋ก๊ทธ repository > settings > secrets and variables > Action** ๋ฉ๋ด์์
**New repository secret**์ ํด๋ฆญ, ๋ณ์๋ก ์ฌ์ฉํ  ์ด๋ฆ์ ์ง์ ํ๊ณ  token value๋ฅผ ๋ด์ฉ์ผ๋ก ์ถ๊ฐํ์ฌ
secrets์ ์ถ๊ฐ์์ผ์ค๋ค.

![open-blog-5.png](open-blog-5.png)

**๋ธ๋ก๊ทธ repository > Actions**๋ก ์ด๋ํ์ฌ **set up a workflow yourself**๋ฅผ ํด๋ฆญํ๋ค.

![open-blog-6.png](open-blog-6.png)

main.yml ์ด๋ฆ์ผ๋ก ์์ฑํ๊ณ , ํธ๋ฆฌ๊ฑฐ๋ฅผ ์คํํ  branch๋ฅผ ์ ํํ๋ค.

```bash
name: Gatsby Publish
on:
  push:
    branches:
      - main
jobs:
  build_gatsby:
    name: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          deploy-branch: gh-pages
```
์์ ๊ฐ์ ํ์์ผ๋ก ์ค์  ํด์ฃผ๋ฉด๋๊ณ 

secrets.ACCESS_TOKEN์ ์ค์ ํ secrets ๋ณ์ ์ด๋ฆ๊ณผ ๋ง์ถฐ์ฃผ๋ฉด ๋๋ค.

![open-blog-7.png](open-blog-7.png)

git pushํ ์ ์์ ์ผ๋ก ๋์ํ๋์ง ํ์ธํ๋ค.

***

ใ **์ฐธ๊ณ ์๋ฃ**

 * [gparkkii๋ ๊ธ](https://velog.io/@gparkkii/build-gatsby-blog)
 * [์ค์ฝ๋ฉ๋ ๊ธ](https://www.zoomkoding.com/gatsby-starter-zoomkoding-introduction/)
* [์ ๋ฆผ๋ ๊ธ](https://milooy.github.io/build-blog-with-gatsby/)








```toc

```