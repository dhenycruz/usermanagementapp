import styled from 'styled-components';

const Box = styled.div<{ loadingPage: Boolean }>`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3%;
  display: flex;
  flex-direction: column;
  color: black;
  height: 550px;
  padding: 10px;
  width: 750px;
  opacity: ${({ loadingPage }) => loadingPage ? 1 : 0};

  animation: fadeMainbox 3s;
  animation-delay: 1s;

  @keyframes fadeMainbox {
    0% {  visibility: visible; opacity: 0; }
    100% { opacity: 1; }
  }

  @media (max-width: 575.98px) {
    width: 95%;
    height: 80vh;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 95%;
    height: 70vh;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 95%;
  }
`;

export default Box;