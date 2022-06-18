import styled from 'styled-components';

export const FooterBox = styled.div`
    align-items: center;
    bottom: 0;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    width: 100%;

    span {
      font-size: 10px;
      margin: 0;
    }

    p {
      margin: 0;
      background: linear-gradient(to right ,#eee, #eee);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: fadeText 2s infinite;
      animation-delay: 0s;
    }

    img:hover {
      background-color: rgba(69, 0, 147, 0.7);
      border-radius: 50%;
    }

    @keyframes fadeText {
      0% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      10% {
        background: linear-gradient(to right ,#be01f2, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      15% {
        background: linear-gradient(to right ,#eee, #be01f2, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      20% {
        background: linear-gradient(to right ,#eee, #eee, #be01f2, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      30% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #be01f2, #eee, #eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      40% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #be01f2, #eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      50% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #eee, #be01f2, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      60% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #eee, #eee, #be01f2, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      70% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #be01f2, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      80% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #be01f2, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      90% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #be01f2);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
      100% {
        background: linear-gradient(to right ,#eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee, #eee);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }
    }
`;