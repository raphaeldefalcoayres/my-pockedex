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

  .bg-green{
    background:#49D0B0;
  }
  .bg-red{
    background:#FA6D6B;
  }
  .bg-blue{
    background:#76BEFE;
  }
  .bg-yellow{
    background:#FFD76F;
  }
  .bg-brown{
    background:#544726;
  }
  .bg-purple{
    background:#9A6FFF;
  }
  .bg-white{
    background:#fff;
    h2 {
      color:#ccc !important;
    }
  }

`;

export const ContainerGlobal = styled.div`
  width: 1140px;
  max-width: calc(100% - 30px);
  margin: 0 auto;
`;
