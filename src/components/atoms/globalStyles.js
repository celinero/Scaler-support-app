import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    padding-bottom: 100px;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: rgb(88, 96, 105);
    background: linear-gradient(180deg, rgb(169 169 169) 0%, rgba(238,237,235,1) 400px) no-repeat;
    min-height: 100vh;
  } 

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-weight: 900;
    line-height: 1.1;
    color: #333333;
    margin: 0;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    color: rgb(88, 96, 105);
    margin: 0;
  }
`;
