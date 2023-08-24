---
title: 팝콘 프로젝트 4주차 회고
date: '2023-06-27 00:00:00'
author: 이용민
tags: 프로젝트 회고
categories: etc
---

![insight_boy.png](insight_boy.png)

## ✔ 4주차 회고

4주차에는 영화 페이지를 구현했다.  
로그인 시에 메인이 될 화면이고 분류에 맞는 영화를 앨범형 리스트로 만들어야했다.

### 1. Did

![리스트.png](리스트.png)

#### ① API  

영화 리스트 렌더링에 필요한 데이터를 위해 API 호출을 해야했다.  
호출할 API 주소와 필요한 키 값들을 Config 파일을 따로 만들어 관리하기 용이하게 설정했고 동일한 데이터 응답 시간을 단축하기 위해 React-Query를 사용했다.  

#### ② React-Query

단순히 데이터를 캐싱하여 사용하고 설정한 값들의 변경을 감지하여 재요청을 보내는 목적으로 리액트 쿼리를 사용했기 때문에 비교적 간단하게 사용할 수 있었다.  
useQuery 메소드를 사용하여 키값과 변경을 감지할 변수, 데이터를 요청하여 promise를 리턴 받을 함수, 특정 상황에 따라 사용을 하기 위한 enabled 정도로 가장 일반적인 패턴으로 구현했다.  

#### ③ 페이지 레이아웃 및 데이터 렌더링

Mui를 이용하여 리스트 페이지의 레이아웃을 구현했다.  
정렬 카테고리 셀렉트 박스를 확정성을 고려해 Stack 컴포넌트를 이용하여 구현했고 리스트는 Grid 컴포넌트로 구현했다.  
리액트 쿼리를 이용하여 응답 받은 데이터들을 props로 하위 컴포넌트에 전달하여 렌더링 하는 방식으로 구현했다.

#### ④ 무한 스크롤

페이징 처리를 위해 무한 스크롤을 차용했다.  
빠른 구현 속도를 위해 react-intersection-observer 라이브러리를 사용했고 Inview 컴포넌트를 이용하여 구현했다.  

```javascript
const handleView = (inView: boolean) => {
  if (inView && page < 10) {
    setPage((prevPage) => prevPage + 1);
  }
};
  
<InView onChange={handleView}>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      mt: "20px",
    }}
  >
    {status === "loading" && <PendingIcon fontSize="large" />}
  </Box>
</InView>
```

onChange props를 이용하여 inview 여부를 boolean으로 리턴 받아 로직을 구현했다.  
useInview hooks를 이용하여 구현하는 방법을 나중에 알았는데 추후에 이 방법으로 전환하는 것도 좋을 것 같다고 생각했다.  

### 2. Issues  

#### ① 무한 스크롤

무한 스크롤을 구현하다가 초기값이 원하는데로 리턴되지 않는 이슈가 있었다.  
초기 렌더링에 동작하지 않고, 스크롤을 내렸을 때만 inView를 true로 리턴 해주는 것을 기대했는데 초기 렌더링 시에도 true값을 리턴하여 page state를 정상적으로 다루지 못했다.  

```javascript
const [isFirstLoad, setIsFirstLoad] = useState(true);

const handleView = (inView: boolean) => {
  // 초기 렌더링 시 로직 두번 타는 거 방지
  if (isFirstLoad) {
    setIsFirstLoad(false);
    return;
  }
  if (inView && page < 10) {
    setPage((prevPage) => prevPage + 1);
  }
};
```

isFirstLoad라는 state를 만들어서 inView를 리턴받는 함수에 초기 렌더링 시에는 페이징 처리를 하지 않도록 하는 방식으로 해결하였다.  

---
