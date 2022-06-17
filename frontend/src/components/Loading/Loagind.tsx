import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  height:100%;

  p {
    margin-top: 20px;
    color: #6600cc;

    animation: p-text 2s;
    animation-iteration-count: infinite;

    -webkit-animation: p-text 2s;
    -webkit-animation-iteration-count: infinite;

    -moz-animation: p-text 2s;
    -moz-animation-iteration-count: infinite;

    -o-animation: p-text 2s;
    -o-animation-iteration-count: infinite;
  }

  @keyframes p-text {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Loading = () => (
  <LoadingBox>
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='#6600cc;'
      size='xl'
    />
    <p>Carregando...</p>
  </LoadingBox>
);
export default Loading;
