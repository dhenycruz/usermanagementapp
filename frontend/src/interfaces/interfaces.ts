export interface IUser {
  id_user: number,
  name: string,
  email: string,
}

export interface IUserResponse {
  totalRows: number,
  getAllUsers: IUser[],
}