import { prisma }from '../database/connection';
import { users } from '@prisma/client';
import { User } from '../interfaces/userInterface';

class UserModel {
  async create(body: User): Promise<users> {
    return prisma.users.create({
      data: body,
    });
}

  async update(id: number, body: User): Promise<users> {
    return prisma.users.update({
      where: { id_user: id },
      data: body,
    });
  }

  async getUser(id: number): Promise<users | null> {
    return prisma.users.findUnique({
      where: {
        id_user: id,
      }
    });
  }

  async getUsers(): Promise<users[]> {
    return prisma.users.findMany();
  }

  async delete(id: number): Promise<users> {
    return prisma.users.delete({
      where: {
        id_user: id,
      }
    });
  }
}

export default UserModel;
