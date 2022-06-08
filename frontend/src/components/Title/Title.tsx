import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TitleH1 = styled.h1`
  animation: fadeIn 2s;
  font-size: 18px;
  margin-bottom: 10px;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;

  ${({ active }) => !active && `
    animation: fadeOut 2s;
    -webkit-animation: fadeOut 2s;
    -moz-animation: fadeOut 2s;
    -o-animation: fadeOut 2s;
  `}

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const TitleFadeIN = styled.h1`
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;

  ${({ active }) => !active && `
    animation: fadeOut 2s;
    -webkit-animation: fadeOut 2s;
    -moz-animation: fadeOut 2s;
    -o-animation: fadeOut 2s;
  `}

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const TitleWelcome = () => {
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setTimeout(function(){
      setFade(false)
    },4000);
  }, []);
  return(
    <>
      <TitleH1 active={ fade }>SEJA BEM VINDO!</TitleH1>
      <TitleFadeIN active={ fade }>Ao seu gerenciador de usuários.</TitleFadeIN>
    </>
  )
}

export default TitleWelcome;