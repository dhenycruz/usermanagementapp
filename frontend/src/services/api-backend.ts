import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

console.log(BASE_URL)

interface User {
  id_user: number;
  name: string;
  email: string;
}

interface Users {
  totalRows: number;
  getAllUsers: User[];
}

interface UserBody {
  name: string;
  email: string;
  password: string;
}

export const fetchAllUsers = async(take: number, skip:number): Promise<Users> => {
  const users = await axios.get(`${BASE_URL}/users/?take=${take}&skyp=${skip}`);
  return users.data;
};

export const getUser = async (id: number): Promise<User> => {
  const user = await axios.get(`${BASE_URL}/users/${id}`);
  return user.data;
};

export const getUserByQuery = async (take: number,skip: number, query: string): Promise<Users>  => {
  const users = await axios.get(`${BASE_URL}/search/?take=${take}&skyp=${skip}&query=${query}`);
  return users.data;
};

export const createUser = async (body: UserBody): Promise <User> => {
  const newUser = await axios({
    method: 'post',
    url: `${BASE_URL}/users`,
    data: body
  });

  return newUser.data;
};

export const updateUser = async (body: UserBody, id: number): Promise<User> => {
  const upUser = await axios({
    method: 'put',
    url: `${BASE_URL}/users/${id}`,
    data: body
  });

  return upUser.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios ({
    method: 'delete',
    url: `${BASE_URL}/users/${id}`
  });
};
