import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../../public/logo.png';

const Nav = styled.div`
  align-items: center;
  background-color: rgba(69, 0, 147, 0.7);
  color: white;
  display: flex;
  height: 60px;
  justify-content: center;
  
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-left: 10px;
  }
`;

const NavBar: React.FC = () => {
  return (
    <Nav>
      { /* https://icons8.com.br/icons/set/users-cell--purple */ }
      <Image src={ logo } alt="Logo da Aplicação" width={ 50 } height={ 40 } />
      <h1>User Management APP</h1>
    </Nav>
  )
};

export default NavBar;
