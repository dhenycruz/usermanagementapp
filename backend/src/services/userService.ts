import { User, UserSchema } from '../interfaces/userInterface';
import { ZodError } from 'zod';
import UserModel from '../models/userModel';
import { users } from '@prisma/client';

interface ServiceError {
  error: ZodError;
}

class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel();  
  }

  async getUser(id: number): Promise<users> {
    return this.model.getUser(id);
  }

  async getUsers(): Promise<users[]> {
    return this.model.getUsers();
  }

  async create(body: User): Promise<User | ServiceError | null> {
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(body);
  }

  async update(id: number, body: User): Promise<User | ServiceError | null> {
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
       return { error: parsed.error }
    }
    return this.model.update(id, body);
  }

  async delete(id: number): Promise<void> {
    await this.model.delete(id);
  }
}

export default UserService;
