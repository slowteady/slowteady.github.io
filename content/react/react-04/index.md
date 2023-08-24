---
title: React-Router-Dom v6
date: '2023-06-14 00:00:00'
author: 이용민
tags: react
categories: react
---

![react-logo.png](react-logo.png)

## ✔ React-Router-Dom v6

기존 React-Router-Dom v5에서 v6로 넘어가면서, 사용법이 바뀌고 기능이 추가되는 등 큰 변화가 있었다.  
대표적으로 변경된 것, 간단한 사용법을 정리한다.

### 1. Routes

① Switch의 네이밍이 Routes로 변경되었다.  
② exact 옵션이 제거되었다.  
③ component, render props가 제거되고 element props가 생겼다.  
④ path props에 상대경로로 지정이 가능해졌다.

```javascript
// v5
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}
```

```javascript
// v6
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}
```

위와 같이 사용할 수 있다.

### 2. 중첩 라우팅

v6 에서는 중첩 라우팅을 가독성 있게 설정할 수 있고 관리가 용이하다.

```javascript
// v5
function App() {
  return (
    <BrowserRouter>
      <Route path="/users" component={Users} />
      <Route path="/users/:userId" component={User} />
    </BrowserRouter>
  );
}
```

```javascript
// v6
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Users />}>
          <Route path=":userId" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

위와 같이 바로 중첩 라우팅을 설정할 수도 있지만 **Outlet**을 사용하면 좀 더 효율적으로 사용할 수 있다.

```javascript
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <h1>My Website</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
```

v5 였다면 각 컴포넌트에 레이아웃을 포함 시켜야했을 로직을 위처럼 **Outlet**과 중첩 라우팅을 이용하여 코드 가독성과 관리를 용이하게 할 수 있다.

### 3. Hooks

① useLocation

```javascript
function MyComponent() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' && <h2>Home Page</h2>}
      {location.pathname === '/about' && <h2>About Page</h2>}
    </div>
  );
}
```

기존 v5의 사용법과 크게 다르지 않고,
위와 같이 useLocation을 이용하여 pathname을 가져와 사용할 수 있다.

② useParams

```javascript
function User() {
  const params = useParams();

  return <h2>User ID: {params.userId}</h2>;
}
```

기존 v5의 사용법과 크게 다르지 않고,
위와 같이 useParams를 이용하여 파라미터를 사용할 수 있다.

③ useRoutes

기존 React-Router-Config가 hook으로 변경되었다.  
패키지를 추가해야했던 것과 다르게 hook을 이용하여 routes를 구성할 수 있게 되었다.

```javascript
function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <Dashboard />,
      children: [
        { path: 'messages', element: <DashboardMessages /> },
        { path: 'tasks', element: <DashboardTasks /> },
      ],
    },
    { path: 'team', element: <AboutPage /> },
  ]);

  return element;
}
```

위와 같이 useRoutes를 사용하여 tree 형태로 구성할 수 있다.

## 4. useNavigate

① useNavigate  
v5 까지 존재하던 useHistory가 제거되고 useNavigate라는 hook이 생겼다.

```javascript
// v5
function App() {
  let history = useHistory();
  function handleClick() {
    history.push('/home');
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

```javascript
// v6
function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate('/home');
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

v6에서는 위와 같이 사용하고, history.push, history.replace를 모두 navigate라는 키워드로 사용한다.  
replace 기능의 경우 **navigate(to, { replace: true })** 와 같이 사용할 수 있다.

② go, goBack, goForward  
useHistory의 기능 { go, goBack, goForward } 의 사용 방식이 변경되었다.  
해당 위치로, 이전으로, 다음으로의 기능이었는데 navigate로 통일하고 index를 넣는 방식으로 변경되었다.

```javascript
// v5
function App() {
  const { go, goBack, goForward } = useHistory();

  return (
    <>
      <button onClick={() => go(-2)}>Go 2 pages back</button>
      <button onClick={goBack}>Go back</button>
      <button onClick={goForward}>Go forward</button>
      <button onClick={() => go(2)}>Go 2 pages forward</button>
    </>
  );
}
```

```javascript
// v6
function App() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-2)}>Go 2 pages back</button>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>Go forward</button>
      <button onClick={() => navigate(2)}>Go 2 pages forward</button>
    </>
  );
}
```

위와 같이 navigate(${index})를 사용하는 방식으로 변경되었다.

---

📂 **참고자료**

- [soryeongk님 글](https://velog.io/@soryeongk/ReactRouterDomV6)
