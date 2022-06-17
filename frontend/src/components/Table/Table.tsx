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
import { BoxTable, HeaderBoxTable, FooterBoxTable, InputSearch } from './TableStyled';

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