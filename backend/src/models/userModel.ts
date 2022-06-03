import { users } from '@prisma/client';
import prisma from '../database/connection';
import { User } from '../interfaces/userInterface';

interface UserReturn {
  id_user: number,
  name: string,
  email: string,
}

class UserModel {
  async create(body: User): Promise <UserReturn | null> {
    return prisma.users.create({
      data: body,
    });
  }

  async update(id: number, body: User): Promise<User | null> {
    return prisma.users.update({
      where: { id_user: id },
      data: body,
    });
  }

  async getUser(id: number): Promise<UserReturn | null> {
    return prisma.users.findUnique({
      where: {
        id_user: id,
      },
      select: {
        id_user: true,
        name: true,
        email: true,
      }
    });
  }

  async getUsers(): Promise<UserReturn[]> {
    return prisma.users.findMany({
      select: {
        id_user: true,
        name: true,
        email: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async delete(id: number): Promise <users | false> {
    return prisma.users.delete({
      where: {
        id_user: id,
      },
    });
  }
}

export default UserModel;
