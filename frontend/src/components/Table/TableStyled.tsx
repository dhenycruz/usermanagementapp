import styled from 'styled-components';

export const BoxTable = styled.div<{ alert: Boolean, searchMobile: Boolean }>`
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
    right: -100%;
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

  .tableBody {
    display: block;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 76%;
    margin: 0;
    margin-top: ${({ searchMobile }) => searchMobile ? '60px' : '0'};
    padding: 0;
    overflow-y: visible;
  }

  tbody tr:hover {
    background-color: #5f00db39;
  }

  .delete-user {
    background: none;
    border: 1px solid red;
    border-radius: 10px;
    color: red;
    font-weight: 700;
    padding: 3px 15px;
  }
  .delete-user:hover {
    background-color: red;
    font-weight: 700;
    color: white;
  }

  .update-user {
    background: none;
    border: 1px solid green;
    border-radius: 10px;
    color: green;
    font-weight: 700;
    padding: 2px 15px;
  }

  .update-user:hover {
    background-color: green;
    font-weight: 700;
    color: white;
  }

  .edit-update-mobile {
    display: none;
  }

  @media (max-width: 575.98px) {
    .th-email {
      display: none;
    }

    .td-email {
      display: none;
    }

    .th-delupuser-none {
      display: none;
    }

    .edit-update-mobile {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      margin-right: 10px;
    }

    .DeleteUser {
      margin-left: 10px;
    }

    .edit-update-mobile img {
      margin-left: 10px;
    }
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    .tableBody {
      height: 65%;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    .tableBody {
      height: 65%;
    }
  }

  @media (min-width: 991.99px) {
    .tableBody {
      height: 68%;
    }
  }
`;

export const HeaderBoxTable = styled.div<{ searchMobile: Boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 20px;

  h2 {
    color: #510183;
  }

  .search-add-user {
    display: block;
  }

  .AddUser {
    cursor: pointer;
    display: block;
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

  @media (max-width: 575.98px) {
    display: ${({ searchMobile }) => searchMobile ? 'none' : 'flex'};
    margin-top: 0;

    h2 {
      width: 100%;
    }

    .AddUser {
      width: 25%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .search-add-user {
      display: none;
    }

    button {
      margin-right: 0;
      margin-left:5px;
    }
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    h2 {
      width: 40%;
    }
    .search-add-user {
      display: flex;
    }

    .AddUser {
      display: none;
    }

    button {
      margin-right: 0;
      margin-left: 10px;
    }

  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    h2 {
      margin-left: 30px;
      width: 30%;
    }

    .AddUser {
      display: none;
    }

    .search-add-user {
      display: flex;
      width: 70%;
    }
    
    button {
      margin-right: 0;
      margin-left: 10px;
    }
  }

  @media (min-width: 991.99px) {
    h2 {
      margin-left: 30px;
      width: 30%;
    }

    .AddUser {
      display: none;
    }

    .search-add-user {
      display: flex;
      width: 60%;
    }

    button {
      margin-right: 0;
      margin-left: 10px;
    }
  }
`;

export const InputMobile = styled.div<{ searchMobile: Boolean }>`
    display: ${({ searchMobile}) => searchMobile ? 'flex' : 'none'};
    flex-wrap: nowrap;
    width: 95%;
    position:fixed;

    input {
      width: 75%;
      border: none;
      border-bottom: 1px solid #510183;
      padding: 20px;
      color: #510183;
      font-size: 18px;
      background: none;
    }

    input:hover {
      border-bottom: 1px solid #6600cc;
    }

    input:focus {
      outline: none;
    }

    button {
      width: 20%;
      background: none;
      border: none;
      color: #510183;
      font-size: 32px;
      font-weight: 700;
      padding: 0;
      text-align: center;
    }

    button:hover {
      color: #8c30c4;
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
    border: 1px solid #5f00db39;
  }

  input:hover {
    background-color: white;
    border: 1px solid #5f00db39;
    background-color: #5f00db39;
  }

  input:focus {
    outline: 1px solid #6600cc;
  }

  img:hover {
    cursor: pointer;
  }

  @media (max-width: 575.98px) {
    width: 60%;
  }

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 60%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 70%;
  }

  @media (min-width: 991.99px) {
    width: 60%;
  }
`;