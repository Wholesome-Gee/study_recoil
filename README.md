# COINPAPRIKA를 활용한 COIN 조회 사이트

📍 강의 사이트 : NOMAD CORDER  
📍 강의 제목 : React JS 마스터클래스  
📍 강의 챕터 : #5 CRYPTO TRACKER  
📍 비고 : NOMAD CORDER 'React JS 마스터클래스 #3 TYPESCRIPT' 강의 내용을 기반으로 작성됨.  
📍 비고 : ReactRouterDom @5.3.0 버전 사용  
📍 라이브러리 :

- react v18 : `npm uninstall react react-dom`, `npm i react@18 react-dom@18`
- styled-components : `npm i styled-components`, `npm i --save-dev @types/styled-components`
- react-router-dom : `npm i react-router-dom`, `npm i --save-dev @types/react-router-dom`
- react-query : `npm i react-query`
  - react-query는 React v18 이하에서 구동이 가능하다.

---

### #5.0

**📗react-router-dom 으로 router 설정하기**

- `npm i react-router-dom`
- `npm i --save-dev @types/react-router-dom`
- src안에 routes폴더, Router.tsx 생성
  - Router.tsx → `import { BrowserRouter, Routes, Route } from "react-router-dom"`

**📗useParams()와 useParams()에 type하기**

---

### #5.1

**📗Styled-components의 createGlobalStyle을 사용하여 GlobalStyle 지정하기**

---

### #5.2

**📗JSX에서 반복문 사용할 땐 map()**  
**📗react-router-dom의 Link를 사용하여 route 이동**

---

### #5.3

**📗JSX에서 조건문 사용할 땐 삼항연산자**  
**📗useEffect()와 fetch()로 받아온 api data에 type하기**

---

### #5.4

**📗react-router-dom의 Link를 사용하여 state를 전달**

- `<Link to={'url'} state={{ key:value }}> link </Link>`

**📗useLocation()으로 Link로부터 넘어온 현재 URL에 대한 정보를 받기**

---

### #5.5 ~ #5.6

**📗개발자도구 console을 활용해 많은 properties를 갖고있는 object의 type을 빠르게 하는 꿀팁**

- console.log(object)
- 개발자도구 console에서 object 우클릭 → 'Store as gloval variable
- Object.keys(temp1).join()
- Object.values(temp1).map(item => typeof item).join()

---

### #5.7

영상시청 후 'horrorkist' 댓글 참고  
**📗nested route 설정하는 방법**  
**📗react-router-dom의 Outlet을 활용하여 nested route가 들어갈 위치 정하기**

---

### #5.8

**📗useMatch(route)를 활용하여 유저가 현재 route에 위치하고 있는지 확인하기**

- `const priceMatch = useMatch('/:coinId/price')`

---

### #5.9

**📗api fetch 함수는 api.ts에 작성하여 component와 분리하는 습관을 갖자**  
**📗react-query의 useQuery()를 활용하여 data를 fetch하는 방법**

- index.tsx `const queryClient = new QueryClient();`
- index.tsx `<QueryClientProvider client={queryClient}>`
- `const { isLoading, data } = useQuery<IData>("allCoins",fetch function)`

---

### #5.10

**📗react-query/devtools의 ReactQueryDevtools로 react-query를 시각화하기**

- App.tsx `import { ReactQueryDevtools } from "react-query/devtools";`
- App.tsx `<ReactQueryDevtools initialIsOpen={true} />`

---

### #5.12

**📗nested route에게 Outlet의 context를 활용하여 props보내는 방법**  
**📗useOutletContext()를 통해 nested route component가 상위 component로부터 props(context)전달 받기**

- nested route를 설정하고 적용할 시,  
  `<Outlet context={{key:value}}/>`를 하여 props(context)를 전달할 수 있다.
- 전달된 `props(context)는 useOutletContext()`를 통해 확인할 수 있다.

---

### #5.13 ~ #5.14

**📗ApexChart로 chart graph 쉽게 표현하기**

- `npm i --save react-apexcharts apexcharts`
- `import ApexChart from "react-apexcharts"`

공식문서 : https://apexcharts.com/

---

### #5.15

**📗useQuery()의 {refetchInterval:10000}을 사용하여 10s마다 refetch 설정하기**

- `const { isLoading, data } = useQuery("dataId", fetch function, {refetchinterval:10000}`

**📗helmet을 이용하여 JSX에서 html head title 변경하기**

- npm i react-helmet
- npm i --save-dev @types/react-helmet

---
