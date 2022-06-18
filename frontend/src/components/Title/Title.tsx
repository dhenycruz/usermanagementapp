import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TitleH1 = styled.h1<{ active: Boolean }>`
  font-size: 18px;
  margin-bottom: 10px;
  opacity: 0;

  animation: fadeIn 10s;
  animation-delay: 1s;
  /* -webkit-animation: fadeIn 10s;
  -moz-animation: fadeIn 10s;
  -o-animation: fadeIn 10s; */

  @keyframes fadeIn {
    0% {  opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const TitleFadeIN = styled.h1<{ active: Boolean }>`
    opacity: 0;

    animation: fadeIn 7s;
    animation-delay: 3s;
`;

const TitleWelcome: React.FC = () => {
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFade(false);
    }, 4000);
  }, []);
  return (
    <>
      <TitleH1 active={fade}>SEJA BEM VINDO!</TitleH1>
      <TitleFadeIN active={fade}>Ao seu gerenciador de usuários.</TitleFadeIN>
    </>
  );
}

export default TitleWelcome;
