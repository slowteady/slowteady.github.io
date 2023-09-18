---
title: 원티드 프리온보딩 프론트엔드 인턴십 4주차 회고
date: '2023-09-16 00:00:00'
author: 이용민
tags: 회고 원티드 프리온보딩
categories: story
---

## 원티드 프리온보딩 프론트엔드 인턴십 4주차 회고

4주차에는 코드 리뷰, 소프트웨어 테스트, 실행 컨텍스트와 클로저에 대해 배웠다.

### 1. 코드 리뷰

#### 1-1. Default Value 설정

```ts
function List() {
  const display = useDisplay();
  const data = useDiseasStore();

  const { isOnIndex, ulRef } = useListNavigation(data?.length || 0, display?.isFocused || false);

  return (
    .
    .
    .
  );
}

export default List;

function useListNavigation(dataLength: number, isFocused: boolean) {
  const [isOnIndex, setIsOnIndex] = useState(INITIAL_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);
```

```ts
function List() {
  const display = useDisplay();
  const data = useDiseasStore();

  const { isOnIndex, ulRef } = useListNavigation(data?.length, display?.isFocused);

  return (
    .
    .
    .
  );
}

export default List;

function useListNavigation(dataLength: number = 0, isFocused: boolean = false) {
  const [isOnIndex, setIsOnIndex] = useState(INITIAL_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);

```

- 함수를 호출할 때 기본값을 설정하는 것 보다 Parameter의 기본값을 설정하여 사용하는 것이 함수 호출 시에 매번 기본값을 설정하지 않아도 되고 코드 가독성에도 좋다.

#### 1-2. Debounce value vs function

Debounce를 구현한 로직이 onChange를 통한 값의 변화를 Debounce 시키는 방법과 요청을 보내는 함수 자체를 Debounce 시키는 방법으로 나뉘었었다.

> 이 중 더 효율적인 방법은 **함수 자체를 Debounce** 하는 방법이다.

- value를 debounce 하는 방법은 state를 하나 더 사용해야한다.

  1. 불필요한 렌더링이 일어난다.
  2. 연쇄적인 변화 방법을 사용하기 때문에 로직 파악이 어려워진다.
  3. 목적 자체가 결국 함수의 실행을 debounce 처리하는 것이기 때문에 value를 debounce 하는 것은 실질적인 목적에 부합하지 않는다.

#### 1-3. 변수명에 구체 포함 X

```ts
class AxiosClient {
  .
  .
  .
}

export const axios = new AxiosClient(API_BASE_URL);
```

- axios라는 변수명으로 사용하게되면 axios라는 라이브러리를 사용했다는 것을 암시하기 때문에 구체가 포함된다.
- 예를 들어, http 요청 라이브러리를 바꾸게 된다면 의미가 변하게 되기 때문에 변수명의 수정이 불가피해진다는 것이다.

```ts
class AxiosClient {
  .
  .
  .
}

export const httpClient = new AxiosClient(API_BASE_URL);
```

- 위와 같이 구체를 포함하지 않는 포괄적인 변수명을 사용하는 것이 보다 변경에 유연할 수 있는 방법이다.

---
