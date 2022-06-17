import { useState, useContext } from 'react';
import {
  Alert,
  AlertIcon,
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
import Loading from '../Loading/Loagind';
import { getUserByQuery } from '../../services/api-backend';

const BoxTable = styled.div<{ alert: Boolean }>`
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


interface Event {
  target: {
    name: string,
    value: string,
  }
}

const TableUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [isOpenUp, setIsOpenUp] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [userSelected, setSelectUser] = useState<IUser>({} as IUser);
  const {
    users,
    loading,
    getUsers,
    setGetUsers,
    setLoading,
    setTotalRows,
    alert,
  } = useContext(UserContext);

  const deleteUser = (user: IUser) => {
    setSelectUser(() => user);
    setIsOpenDel(true);
  };

  const updateUser = (user: IUser) => {
    setSelectUser(() => user);
    setIsOpenUp(true);
  };

  const handleChange = async ({ target: { value } }: Event) => {
    if (value === '') {
      setSearchUser(value);
      setLoading(true);
      getUsers(6, 0);
      return;
    }
    const { totalRows, getAllUsers } = await getUserByQuery(6, 0, value);
    console.log(getAllUsers);
    setSearchUser(value);
    setGetUsers(getAllUsers);
    setTotalRows(totalRows);
  };

  const RenderTable = () => {
    if (!loading) {
      if (users.length <= 0) {
        return <p className="user-not-found">Nenhum usuário encontrado!</p>
      } else {
        return (
          <>
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
                  <Td className="delete-user" onClick={ () => deleteUser(user) }>excluir</Td>
                  <Td className="update-user" onClick={ () => updateUser(user) }>editar</Td>
                </Tr> ))
              }
            </Tbody>
            </Table>
          </>
        );
      }
    }

    return <Loading />
  }

  return(
    <>
      <BoxTable alert={ alert.alert }>
        <HeaderBoxTable>
          <h2>Lista de usuários</h2>
          <InputSearch>
            <input placeholder="Pesquisar por usuários" value={ searchUser } onChange={ handleChange }/>
            {/* https://icons8.com.br/icons/set/search--purple */}
            <Image src={ SearchUser } alt="icone pesquisar" width={ 40 } height={ 28 }/>
          </InputSearch>
          <button type="button" onClick={ () => setIsOpen(true) }>Adicionar usuário</button>
        </HeaderBoxTable>
        <TableContainer className="tableBody">
          <RenderTable />
        </TableContainer>
        <FooterBoxTable>
          { users.length > 0 &&  <Pagination /> }
        </FooterBoxTable>
        <CreateUser isOpen={ isOpen } setIsOpen={ setIsOpen } />
        { userSelected.name && (
          <>
            <DeleteUser isOpen={ isOpenDel } setIsOpen={ setIsOpenDel } user={ userSelected } />
            <UpdateUser isOpen={ isOpenUp } setIsOpen={ setIsOpenUp } user={ userSelected } setSelectUser={ setSelectUser } />
          </>
        )}
        { alert.alert &&
              <Alert status='success' variant='solid'>
                <AlertIcon />
                { alert.message }
              </Alert> }
      </BoxTable>
    </>
  );
};

export default TableUser;