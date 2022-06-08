import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import styled from 'styled-components';
import DeleteUser from '../Modals/DeleteUser';
import CreateUser from '../Modals/CreateUser';
import UpdateUser from '../Modals/UpdateUser';

const BoxTable = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;

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
`;

const HeaderBoxTable = styled.div`
  display: flex;
  width: 750px;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 20px;

  h2 {
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

const TableUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [userSelected, setSelectUser] = useState({});
  const users = [1,2,3,4,5,6]
  const userExem = {
    id_user: 1,
    name: 'Dheniarley',
    email: 'dheniarley@email.com',
  }

  const deleteUser = (user:object) => {
    setSelectUser(user);
    setIsOpenDel(true);
  };

  const updateUser = (user: object) => {
    setSelectUser(user);
    setIsOpenUp(true);
  };

  return(
    <>
      <BoxTable>
        <HeaderBoxTable>
          <h2>Lista de usuários</h2>
          <button type="button" onClick={ () => setIsOpen(true) }>Adicionar usuário</button>
        </HeaderBoxTable>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>#id</Th>
                <Th>nome</Th>
                <Th>email</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              { users.map((_user, index) => (
                <Tr key={ index }>
                  <Td><b>{ index + 1 }</b></Td>
                  <Td>Dheniarley Cruz</Td>
                  <Td>dheniarley@email.com</Td>
                  <Td onClick={ () => deleteUser(userExem) }>excluir</Td>
                  <Td onClick={ () => updateUser(userExem) }>editar</Td>
                </Tr> ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </BoxTable>
      <DeleteUser isOpen={ isOpenDel } setIsOpen={ setIsOpenDel } />
      <CreateUser isOpen={ isOpen } setIsOpen={ setIsOpen } />
      <UpdateUser isOpen={ isOpenUp } setIsOpen={ setIsOpenUp } />
    </>
  );
};

export default TableUser;