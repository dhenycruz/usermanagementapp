import styled from 'styled-components';

export const BoxTable = styled.div<{ alert: Boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

  .chakra-alert  {
    position: fixed;
    visibility: hidden;
    width: 30%;
    bottom: 30%;
    right: 20%;
    border-radius: 10px;
  
    ${({ alert }) => alert && (
      `visibility: visible;
      animation: fadeIn 10s;
      -webkit-animation: fadeIn 10s;
      -moz-animation: fadeIn 10s;
      -o-animation: fadeIn 10s;`
    )}
  }

  @keyframes fadeIn {
    0% { 
      opacity: 0; 
      right: -100%;
    }

    40% {
      opacity: 1;
      right: 20%;
    }

    60% {
      opacity: 1;
      right: 20%;
    }

    100% {
      opacity: 0; 
      right: -100%;
    }
  }

  .user-not-found {
    font-size: 24px;
    margin-top: 30px;
    text-align: center;
  }

  tbody tr:hover {
    background-color: #5f00db39;
  }
  input {
    border: 1px solid #5f00db39;
  }

  input:hover {
    border: 1px solid #5f00db39;
    background-color: #5f00db39;
  }

  img:hover {
    cursor: pointer;
  }

  .tableBody {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 65%;
  }

  .delete-user:hover {
    color: red;
    font-weight: 700;
  }

  .update-user:hover {
    color: green;
    font-weight: 700;
  }
`;

export const HeaderBoxTable = styled.div`
  display: flex;
  width: 750px;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 20px;

  h2 {
    color: #510183;
    margin-left: 50px;
  }

  button {
    border: 1px solid #5f00db39;
    border-radius: 5px;
    margin-right: 50px;
    padding: 10px;
  }

  button:hover {
    background-color: #5f00db39;
  }
`;

export const FooterBoxTable = styled.div`
  display: flex;
  width: 100%;
  justify-content:center;
  margin-top: 40px;
`;

export const InputSearch = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  height: 40px;
  padding-right: 5px;
  width: 300px;

  &:hover {
    outline: 2px solid #6600cc;
  }

  input {
    color: #6600cc;
    font-size: 16px;
    height: 100%;
    text-align: center;
    width: 100%;
  }

  input:hover {
    background-color: white;
  }

  input:focus {
    outline: 1px solid #6600cc;
  }
`;