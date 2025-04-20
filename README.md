# RECOIL을 활용한 REACT STATE MANAGEMENT

📍 강의 사이트 : NOMAD CORDER  
📍 강의 제목 : React JS 마스터클래스  
📍 강의 챕터 : #6 STATE MANAGEMENT  
📍 비고 : NOMAD CORDER 'React JS 마스터클래스 #5 CRYPTO TRACKER' 강의 내용에서 Theme Change Button을 추가하였고 (#6.4),  
 이후 새로운 ToDoList를 만들기 위해 초기화작업을 #6.5에서 진행함.  
📍 비고 : React 18 버전 사용  
📍 라이브러리 :

- react v18 : `npm uninstall react react-dom`, `npm i react@18 react-dom@18`
- styled-components : `npm i styled-components`, `npm i --save-dev @types/styled-components`
- react-router-dom : `npm i react-router-dom`, `npm i --save-dev @types/react-router-dom`
- react-query : `npm i react-query`
  - react-query는 React v18 이하에서 구동이 가능하다.
- recoil : `npm i recoil`

---

### #6.1

**📗recoil은 state를 global영역에 두어 관리해주는 라이브러리**

---

### #6.2

**📗recoil 세팅하는 방법**

- `npm i recoil`
- index.tsx의 JSX부분을 `<RecoilRoot>`로 감싸기

**📗recoil에 변수(atom)를 등록하는 방법**

- atom.ts 생성
- `export const isDarkAtom({ key: "isDark", default: false })`

**📗useRecoilValue()를 사용하여 recoil의 변수(atom)을 가져오기**

- `const isDark = useRecoilValue(isDarkAtom)`

---

### #6.3

**📗useSetRecoilState()를 사용하여 recoil의 변수(atom)의 값을 변경하기**

- `const setIsDarkAtom = useSetRecoilState(isDarkAtom)`

---

### #6.5

**📗toDoList를 만들기 위한 프로젝트 초기화 작업**

---

### #6.6

**📗react-hook-form은 form 작업을 보다 수월하게 해주는 라이브러리**

- `npm i react-hook-form`

**📗useForm()을 사용하여 form 요소를 react-hook-form에 등록하기**

```tsx
const { register, watch } = useForm()
console.log(watch())
// watch()는 input에 123123입력 시 → {email: '123123'} 를 리턴
<input {...register('email')} placeholder="email을 입력하세요.">
```

- {...register('email')}을 사용하여 해당 input을 'email'이라는 식별자로 react-hook-form에 등록할 수 있다.
- watch()는 react-hook-form에 등록된 form 요소들에 변화가 생기는걸 추적한다.
