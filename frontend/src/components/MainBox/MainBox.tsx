import styled from 'styled-components';

const Box = styled.div<{ loadingPage: Boolean }>`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3%;
  display: flex;
  flex-direction: column;
  color: black;
  height: 100%;
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
    height: 70%;
    border-radius: 1%;
    padding: 5px;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 95%;
    height: 70%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 95%;
    height: 70%;
  }

  @media (min-width: 991.99px) {
    width: 75%;
    height: 65%;
  }
`;

export default Box;