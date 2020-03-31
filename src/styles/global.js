import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
    letter-spacing:0.1px;
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
  .bg-black{
    background:#111;
  }
  .bg-pink{
    background:#FC6CB4;
  }
  .bg-gray{
    background:#d3d3d3;
  }
  .bg-white{
    background:#fff;
    color:#ccc;
    * {
      color:#ccc !important;
    }
  }
  .bg-all{
    background:#999;
    color:#fff;
  }

  b{
    letter-spacing:0.5px;
  }

  input,select,textarea{
    border:1px solid #ddd;
    border-radius:5px;
    padding:5px 5px;
    color:#222;
    font-size:12px;
  }

`;

export const ContainerGlobal = styled.div`
  width: 1140px;
  max-width: calc(100% - 30px);
  margin: 0 auto;
`;
