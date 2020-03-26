import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  *:focus{
    outline:0;
  }

  html, body, #root{
    min-height:100%;
    position:relative;
    overflow-x:hidden;
  }

  body{
    -webkit-font-smoothing: antialiased;
    background:#FBFBFB;
  }

  body, input, button{
    font:1rem proxima-nova,Arial,Helvetica,sans-serif;
    color:#1F2D30;
  }

`;

export const ContainerGlobal = styled.div`
  width: 1140px;
  max-width: calc(100% - 30px);
  margin: 0 auto;
`;
