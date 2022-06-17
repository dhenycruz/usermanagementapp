import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../../public/logo.png';

const Nav = styled.div<{ loadingPage: Boolean }>`
  align-items: center;
  background-color: rgba(69, 0, 147, 0.7);
  color: white;
  display: flex;
  height: 60px;
  justify-content: center;
  position: fixed;
  width: 100%;
  opacity: ${({ loadingPage }) => loadingPage ? 1 : 0};

  animation: fadeNav 3s;
  animation-delay: 1s;

  @keyframes fadeNav {
    0% {  visibility: visible; opacity: 0; }
    100% { opacity: 1; }
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-left: 10px;
  }
`;

type Props = {
  loadingPage: boolean;
}
const NavBar = ({ loadingPage }: Props) => {
  return (
    <Nav loadingPage={ loadingPage }>
      { /* https://icons8.com.br/icons/set/users-cell--purple */ }
      <Image src={ logo } alt="Logo da Aplicação" width={ 50 } height={ 40 } />
      <h1>User Management APP</h1>
    </Nav>
  )
};

export default NavBar;
