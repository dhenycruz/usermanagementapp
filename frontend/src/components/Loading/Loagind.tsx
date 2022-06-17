import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

const LoadingBox = styled.div`
  display: flex;
  flex-direaction: column;
  justify-content:center;
  align-items:center;
  height:100%;
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
