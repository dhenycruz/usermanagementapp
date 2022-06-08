import styled from 'styled-components';

const Nav = styled.div`
  align-items: center;
  background-color: rgba(69, 0, 147, 0.7);
  color: white;
  display: flex;
  font-size: 24px;
  font-weight: 700;
  height: 60px;
  justify-content: center;
  
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;
`;

const NavBar = () => {
  return (
    <Nav>
      User Management APP
    </Nav>
  )
};

export default NavBar;
