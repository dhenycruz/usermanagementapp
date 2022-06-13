import {
  useState, createContext, ReactNode, useEffect
} from 'react';
import { IUser } from '../interfaces/interfaces';
import { fetchAllUsers } from '../services/api-backend';

interface IUserContext {
  users: IUser[],
  setGetUsers(param: IUser[]): void,
  getUsers(take: number, skip: number): void,
  loading: boolean,
  setLoading(param: boolean): void,
  rowsTotal: number,
  setTotalRows(param: number): void,
  skip: number,
  setSkip(param: number): void,
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

type Props = { children: ReactNode }

export function UserProvider({ children }: Props) {
  const [users, setGetUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rowsTotal, setTotalRows] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);

  const getUsers = async (take: number, paramSkip: number): Promise<void> => {
    const { totalRows, getAllUsers} = await fetchAllUsers(take, paramSkip);
    setGetUsers(getAllUsers);
    setTotalRows(totalRows);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getUsers(6, 0);
  }, []);

  return (
    <UserContext.Provider value={ {
      users,
      setGetUsers,
      getUsers,
      loading,
      setLoading,
      rowsTotal,
      setTotalRows,
      skip,
      setSkip,
    }}>
      { children }
    </UserContext.Provider>
  );
}
