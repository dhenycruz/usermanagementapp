import { User, UserSchema } from '../interfaces/userInterface';
import UserModel from '../models/userModel';
import { users } from '@prisma/client';

interface ServiceError {
  error: string;
}

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();  
  }

  async getUser(id: number): Promise<users | null> {
    return this.model.getUser(id);
  }

  async getUsers() {
    return this.model.getUsers();
  }

  async create(body: User): Promise<users | ServiceError | null> {
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }
    return this.model.create(body);
  }

  async update(id: number, body: User): Promise<users | ServiceError | false> {
    const user = await this.model.getUser(id);
    if (!user) return false;
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
       return { error: parsed.error.issues[0].message }
    }
    return this.model.update(id, body);
  }

  async delete(id: number): Promise<users | false>  {
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
}

export default new UserService();
