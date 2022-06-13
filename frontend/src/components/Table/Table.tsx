import { useState, useContext } from 'react';
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
import Image from 'next/image';
import SearchUser from '../../../public/search-user.png';
import Pagination from '../Pagination/Pagination';
import { UserContext } from '../../context/UserContext';
import { IUser } from '../../interfaces/interfaces';

const BoxTable = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

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
`;

const HeaderBoxTable = styled.div`
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

const FooterBoxTable = styled.div`
  display: flex;
  width: 100%;
  justify-content:center;
  margin-top: 40px;
`;

const InputSearch = styled.div`
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

const TableUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [userSelected, setSelectUser] = useState<IUser>({} as IUser);
  const { users } = useContext(UserContext);

  const deleteUser = (user: IUser) => {
    setSelectUser(user);
    setIsOpenDel(true);
  };

  const updateUser = (user: IUser) => {
    setSelectUser(user);
    setIsOpenUp(true);
  };

  return(
    <>
      <BoxTable>
        <HeaderBoxTable>
          <h2>Lista de usuários</h2>
          <InputSearch>
            <input placeholder="Pesquisar por usuários"/>
            {/* https://icons8.com.br/icons/set/search--purple */}
            <Image src={ SearchUser } alt="icone pesquisar" width={ 40 } height={ 28 }/>
          </InputSearch>
          <button type="button" onClick={ () => setIsOpen(true) }>Adicionar usuário</button>
        </HeaderBoxTable>
        <TableContainer className="tableBody">
          { users.length <= 0 ? ( <p>Nenhum usuário cadastrado!</p> ) :(
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
                { users.map((user:  IUser, index: number) => (
                  <Tr key={ index }>
                    <Td><b>{ user.id_user }</b></Td>
                    <Td>{ user.name }</Td>
                    <Td>{ user.email }</Td>
                    <Td onClick={ () => deleteUser(user) }>excluir</Td>
                    <Td onClick={ () => updateUser(user) }>editar</Td>
                  </Tr> ))
                }
              </Tbody>
            </Table>
          )}
        </TableContainer>
        <FooterBoxTable>
          { users.length > 0 &&  <Pagination /> }
        </FooterBoxTable>
      </BoxTable>
      <DeleteUser isOpen={ isOpenDel } setIsOpen={ setIsOpenDel } user={ userSelected } />
      <CreateUser isOpen={ isOpen } setIsOpen={ setIsOpen } />
      <UpdateUser isOpen={ isOpenUp } setIsOpen={ setIsOpenUp } />
    </>
  );
};

export default TableUser;