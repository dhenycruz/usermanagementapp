import prisma from '../database/connection';
import User from '../interfaces/userInterface';

class UserModel {
  async create(body: User) {
    try {
      const newUser = await prisma.users.create({
        data: body,
      });
      return newUser
    } catch (error) {
      return error;
    }
  }

  async update(id: number, body: User) {
    try {
      const upUser = await prisma.users.update({
        where: { id_user: id },
        data: body,
      });
      return upUser;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: number) {
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

  async getUsers() {
    try {
      return prisma.users.findMany();
    } catch (error) {
      return error;
    }
  }
}