import { users } from '@prisma/client';
import prisma from '../database/connection';
import { User } from '../interfaces/userInterface';

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

class UserModel {
  async create(body: BodyCreate): Promise <UserReturn | null> {
    return prisma.users.create({
      data: body,
      select: {
        id_user: true,
        email: true,
        name: true,
      },
    });
  }

  async update(id: number, body: User): Promise<UserReturn | null> {
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
      },
    });
  }

  async getUsers(take: number, skip: number): Promise<GetAllUsers> {
    const totalRows = await prisma.users.count();
    const getAllUsers = await prisma.users.findMany({
      take,
      skip, // Skip the cursor */
      select: {
        id_user: true,
        name: true,
        email: true,
      },
    });

    return { totalRows, getAllUsers };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserByQuery(
    take:number,
    skip: number,
    query: string,
  ): Promise<GetAllUsers> {
    const totalRows = await prisma.users.count({
      where: {
        OR: [
          { email: { contains: query } },
          { name: { contains: query } },
        ],
      },
    });
    const getAllUsers = await prisma.users.findMany({
      take,
      skip, // Skip the cursor */
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id_user: true,
        name: true,
        email: true,
      },
    });

    return { totalRows, getAllUsers };
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
