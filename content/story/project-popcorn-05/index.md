---
title: 팝콘 프로젝트 5, 6주차 회고
date: '2023-07-11 00:00:00'
author: 이용민
tags: 프로젝트 회고
categories: story
---

![insight_boy.png](insight_boy.png)

## ✔ 5,6주차 회고

회사에서 진행하던 프로젝트가 막바지 단계여서 야근이 잦아졌다.  
프로젝트에 많은 시간 투자를 하지 못해서 아쉬웠다.  
5,6 주차에는 헤더의 검색 창을 통한 영화 검색 기능, 검색 페이지를 구현했다.  

### 1. Did

![검색헤더.png](검색헤더.png)

#### ① 헤더를 통한 검색

템플릿을 참고하여 헤더의 돋보기 아이콘 클릭 시 검색 레이어가 출력되게 구현했고 검색 시 Search 메뉴로 이동하면서 검색 결과를 앨범 리스트로 출력 해주도록 구현했다.

#### ② 메뉴를 통한 검색

Search 메뉴를 통해 들어와 검색을 했을 때 검색 결과를 앨범 리스트로 출력 해주도록 구현했다.

#### ③ 검색 기능

API에 검색어를 파라미터로 설정하여 요청을 하면 검색 결과를 제공해주는 기능이 있어서 React-Query를 통해 검색어가 변경되면 요청을 보내는 방식으로 구현했다.

### 2. Issues  

#### ① 동일 컴포넌트 사용

동일 컴포넌트로 헤더를 통한 검색, 메뉴를 통한 검색에 따른 결과를 출력 해주다보니 디테일한 부분들을 신경써야했다.

1. 상단 검색바를 통해 검색한 경우  
  1-1. 검색 했을 때 Search 메뉴의 검색바에 값이 들어있어야함  
  1-2. Search 메뉴의 검색바로 다시 검색하면 state 초기화 되어야함  
2. Search 메뉴의 검색바를 통해 검색한 경우  
  2-1. Search 메뉴를 클릭했을 때 모든 state가 초기화 되어야함  
  2-2. 기존과 다른 키워드로 검색한 경우 리스트 초기화 되어야함  
  2-3. 빈 값을 검색하면 request 요청 보내지 않아야함  

정도로 신경써야할 케이스를 리스트업을 했고 각 케이스의 로직을 처리했다.  
그 결과, 기능적으로는 정상동작 했지만 한 컴포넌트에서 다뤄야할 state가 많아졌고 코드가 지저분해졌다.  
추후에 리펙토링을 진행하면 관심사를 분리하여 컴포넌트를 좀 더 잘게 쪼개야겠다는 생각을 했다.

#### ② useEffect

useQuery를 통해 받아온 data가 갱신 될 때 마다 state를 변경되게 하는 로직을 짜야했고 useEffect를 사용해야겠다는 생각을 해 두번째 아규먼트로 [data]를 주어서 구현을 했었다.  
컴포너트의 로직이 간단할 때는 정상적으로 동작했지만, 여러 컴포넌트와 유기적으로 동작하게 됐을 때 문제가 발생했다.  
렌더링 후에 동작하는 useEffect의 특성 때문에 로직이 처리되어야할 순서가 꼬여버렸다.  
선행되어야할 로직이 실행되기 전에 다른 로직이 실행되었고 원하는대로 동작하지 않았다.  
방법을 찾던 도중, useQuery 함수의 세번째 아규먼트에 onSuccess를 사용하면 status, data를 객체로 받아서 처리할 필요 없이 요청 성공 시 로직을 바로 실행시킬 수 있다는 것을 알게되었다.  

```javascript
  const { status } = useQuery(
    ["movieData", url, page],
    () => getMovieData(url, page),
    {
      onSuccess: (data) => {
        setMovies((prevMovie) => [...prevMovie, ...data.payload]);
      },
      enabled,
    }
  );

```

의 형태로 로직을 변경했고 원하는대로 정상동작 하게 되었다.  
공식문서를 참고해서 onSuccess의 존재를 알았으면 조금 더 빨리 해결할 수 있지 않았을까 라는 생각이 들었고 공식문서를 보는 습관을 들여야겠다는 생각을 했다.

---