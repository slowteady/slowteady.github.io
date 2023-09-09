---
title: 원티드 프리온보딩 프론트엔드 인턴십 3주차 회고
date: '2023-09-09 00:00:00'
author: 이용민
tags: 회고 원티드 프리온보딩
categories: story
---

## 원티드 프리온보딩 프론트엔드 인턴십 3주차 회고

3주차에는 코드 리뷰, contextAPI, 의존성, TypeScript에 대해 배웠다.

### 1. 코드 리뷰

#### 1-1. 매직넘버 지양

```ts
const isPromotionSection = (issuesIndex) =>
  issuesIndex > 0 && issuesIndex % 4 === 0;
```

```ts
const AD_EXPOSE_INTERVAL = 4;

const isPromotionSection = (issuesIndex) =>
  issuesIndex > 0 && issuesIndex % AD_EXPOSE_INTERVAL === 0;
```

- 매직 넘버란 코드에서 쓰일 수 있는 특정 숫자를 지칭한다.  
- 코드에서 **4** 와 같은 숫자는 그냥 사용한다면 어떤 의미인지 알기 어렵다.
- 상수로 정의하여 숫자에 대한 의미까지 같이 부여하는 것이 적합하다.


---
