import bcrypt from 'bcryptjs';
import { users } from '@prisma/client';
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

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  async getUser(id: number): Promise<UserReturn | null> {
    return this.model.getUser(id);
  }

  async getUsers(): Promise<UserReturn[]> {
    return this.model.getUsers();
  }

  async create(body: User): Promise<UserReturn | ServiceError | null> {
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    return this.model.create(body);
  }

  async update(id: number, body: User): Promise<UserReturn | ServiceError | null> {
    const user = await this.model.getUser(id);
    if (!user) return null;
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }
    return this.model.update(id, body);
  }

  async delete(id: number): Promise<users | false> {
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
