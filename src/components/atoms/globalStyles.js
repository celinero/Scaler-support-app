import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: rgb(88, 96, 105);
    background: linear-gradient(180deg, rgba(238,237,235,1) 0%, rgba(255, 255, 255, 0) 300px) no-repeat;
    min-height: 100vh;
  } 
`;
