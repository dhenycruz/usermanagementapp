import { users } from '@prisma/client';
import { prisma }from '../database/connection';
import { User } from '../interfaces/userInterface';

interface Users extends User {
  id_user: number,
}
class UserModel {
  async create(body: User): Promise<Users> {
    return prisma.users.create({
      data: body,
    });
}

  async update(id: number, body: User): Promise<Users> {
    return prisma.users.update({
      where: { id_user: id },
      data: body,
    });
  }

  async getUser(id: number): Promise<Users | null> {
    return prisma.users.findUnique({
      where: {
        id_user: id,
      }
    });
  }

  async getUsers(): Promise<Users[]> {
    return prisma.users.findMany();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.users.findUnique({
      where: {
        email,
      }
    })
  }

  async delete(id: number): Promise <users | false> {
    return prisma.users.delete({
      where: {
        id_user: id,
      }
    });
  }
}

export default UserModel;
