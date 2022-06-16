import {
  useState, createContext, ReactNode, useEffect
} from 'react';
import { IUser } from '../interfaces/interfaces';
import { fetchAllUsers } from '../services/api-backend';

interface IAlert {
  alert: boolean,
  message: string,
}

interface IUserContext {
  users: IUser[],
  setGetUsers(param: IUser[]): void,
  getUsers(take: number, skip: number): void,
  loading: boolean,
  setLoading(param: boolean): void,
  rowsTotal: number,
  setTotalRows(param: number): void,
  alert: IAlert,
  openAlert(param: string): void,
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

type Props = { children: ReactNode }

export function UserProvider({ children }: Props) {
  const [users, setGetUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rowsTotal, setTotalRows] = useState<number>(0);
  const [alert, setAlert] = useState<IAlert>({ alert: false, message: '' });

  const getUsers = async (take: number, paramSkip: number): Promise<void> => {
    const { totalRows, getAllUsers} = await fetchAllUsers(take, paramSkip);
    setGetUsers(getAllUsers);
    setTotalRows(totalRows);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const openAlert = (text: string) => {
    setAlert({ alert: true, message: text });
    setTimeout(() => {
      setAlert({ alert: false, message: text });
    }, 11000);
  }

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
      alert,
      openAlert,
    }}>
      { children }
    </UserContext.Provider>
  );
}
