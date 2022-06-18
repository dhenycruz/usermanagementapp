import axios from 'axios';

const BASEURL = process.env.BASEURL;
console.log(process.env.BASEURL);

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

interface UserBodyUpdate {
  name: string;
  email: string;
}

interface GetUserBYID extends User {
  password: string;
}
export const fetchAllUsers = async(take: number, skip:number): Promise<Users> => {
  const users = await axios.get(`${BASEURL}/users/?take=${take}&skip=${skip}`);
  return users.data;
};

export const getUser = async (id: number): Promise<User> => {
  const user = await axios.get(`${BASEURL}/users/${id}`);
  return user.data;
};

export const getUserByQuery = async (take: number,skip: number, query: string): Promise<Users>  => {
  const users = await axios.get(`${BASEURL}/search/?take=${take}&skip=${skip}&query=${query}`);
  return users.data;
};

export const createUser = async (body: UserBody): Promise <User> => {
  const newUser = await axios({
    method: 'post',
    url: `${BASEURL}/users`,
    data: body
  });

  return newUser.data;
};

export const updateUser = async (body: UserBodyUpdate, id: number): Promise<User> => {
  const upUser = await axios({
    method: 'put',
    url: `${BASEURL}/users/${id}`,
    data: body
  });
  return upUser.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios ({
    method: 'delete',
    url: `${BASEURL}/users/${id}`
  });
};
