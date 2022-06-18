import { genSalt, hash } from 'bcryptjs';
import { User, UserSchema } from '../interfaces/userInterface';
import UserModel from '../models/userModel';

interface ServiceError {
  error: string;
}

interface UserReturn {
  id_user: number,
  name: string,
  email: string,
}

interface GetAllUsers {
  totalRows: number,
  getAllUsers: UserReturn[],
}

interface BodyCreate {
  name: string,
  email: string,
  password: string,
}

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  async getUser(id: number): Promise<UserReturn | null> {
    return this.model.getUser(id);
  }

  async getUsers(take: number, skip: number): Promise<GetAllUsers> {
    return this.model.getUsers(take, skip);
  }

  async getUserByQuery(
    take: number,
    skip: number,
    query: string,
  ): Promise<GetAllUsers> {
    return this.model.getUserByQuery(take, skip, query);
  }

  async create(body: BodyCreate): Promise<UserReturn | ServiceError | null> {
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }

    const salt = await genSalt(10);
    const newPassord = await hash(body.password, salt);

    return this.model.create({
      name: body.name,
      email: body.email,
      password: newPassord,
    });
  }

  async update(
    id: number,
    body: User,
  ): Promise<UserReturn | ServiceError | null> {
    const user = await this.model.getUser(id);
    if (!user) return null;
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }
    return this.model.update(id, body);
  }

  async delete(id: number): Promise<UserReturn | false> {
    const user = await this.model.getUser(id);
    return user
      ? this.model.delete(id)
      : false;
  }

  async verifyEmailExists(email: string): Promise<true | false> {
    const user = await this.model.getUserByEmail(email);
    if (!user) return false;
    return true;
  }

  // Font: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  async validateEmail(email: string): Promise<true | false> {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}

export default new UserService();
