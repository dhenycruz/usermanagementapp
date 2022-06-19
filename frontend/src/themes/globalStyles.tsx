import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './themes';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
  }

   body {
    background: linear-gradient(rgba(69, 0, 147, 0.8), rgba(0, 0, 0, .9)), url('https://images.pexels.com/photos/9304917/pexels-photo-9304917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: cover;
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    overflow: hidden;
    width: 100%;
  }

  main {
    align-items: center;
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  main .logo-index {
    opacity: 0;

    animation: fadeIn 10s;
    animation-delay: 1s;

    @keyframes fadeIn {
      0% {  opacity: 0; }
      50% { opacity: 1; }
      100% { opacity: 0; }
    }
  }
`;
