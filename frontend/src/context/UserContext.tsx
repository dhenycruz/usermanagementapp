import {
  useState, createContext, ReactNode,
} from 'react';
import { IUserResponse } from '../interfaces/interfaces';
import { fetchAllUsers } from '../services/api-backend';

interface IUserContext {
  users: object[],
  setUsers: Function,
  getUsers: Function,
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

type Props = { children: ReactNode }

export function UserProvider({ children }: Props) {
  const [users, setUsers] = useState([]);

  const getUsers = async (take: number, skip: number): Promise <IUserResponse> => {
    const { totalRows, getAllUsers} = await fetchAllUsers(take, skip);
    return { totalRows, getAllUsers};
  };

  return (
    <UserContext.Provider value={ { users, setUsers, getUsers }}>
      { children }
    </UserContext.Provider>
  );
}
