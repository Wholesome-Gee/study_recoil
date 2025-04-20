import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools"; // react-query 시각화 작업을위한 import
import Router from "./Router";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
 *[hidden] {
      display: none;
  }
  body {
    line-height: 1.2;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Nanum Gothic", sans-serif;
    background-color:${(props) => props.theme.backgroundColor};
    color:${(props) => props.theme.textColor};
    transition: all 0.2s ease-in-out;
  }
  a {
    text-decoration:none;
    color: inherit;
  }
`;
const ThemeChangeButton = styled.button`
  background-color: ${(props) => props.theme.textColor};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  font-size: 28px;
  outline: none;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDarkAtom = useSetRecoilState(isDarkAtom);
  // useRecoilValue()는 recoil에 등록된 변수(atom)를 가져오는 방법  #6.2
  // useSetRecoilState()는 recoil에 등록된 변수(atom)를 변경하는 함수를 반환한다.  #6.3
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ThemeChangeButton
        onClick={() => {
          setIsDarkAtom((value) => !value);
        }}
      >
        <p>{isDark ? "☀️" : "🌙"}</p>
      </ThemeChangeButton>
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
}

export default App;
