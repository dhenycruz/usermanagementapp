import { prisma }from '../database/connection';
import { users } from '@prisma/client';
import { User } from '../interfaces/userInterface';

class UserModel {
  async create(body: User): Promise<users | unknown> {
    try {
      return await prisma.users.create({
        data: body,
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: number, body: User): Promise<users | unknown > {
    try {
      return await prisma.users.update({
        where: { id_user: id },
        data: body,
      });
    } catch (error) {
      return error;
    }
  }

  async getUser(id: number): Promise<users | unknown> {
    try {
      return prisma.users.findUnique({
        where: {
          id_user: id,
        }
      });
    } catch(error) {
      return error;
    }
  }

  async getUsers(): Promise<users[] | unknown> {
    try {
      return prisma.users.findMany();
    } catch (error) {
      return error;
    }
  }

  async delete(id: number) {
    try {
      await prisma.users.delete({
        where: {
          id_user: id,
        }
      });
    } catch (error) {
      return Error;
    }
  }
}

export default UserModel;
