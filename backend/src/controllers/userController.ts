import { Request, Response } from 'express';
import service from '../services/userService';

class UserController {
  private _route:  string;

  constructor() {
    this._route = '/users';
  }

  get route() { return this._route }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const users = await service.getUser(Number(id));
      return users
        ? res.status(200).json(users)
        : res.status(404).json({ error: 'User not found.' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUsers(_req: Request, res: Response) {
    try {
      const users = await service.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const newUser = await service.create(body);
      if (!newUser) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if('error' in newUser) {
        return res.status(400).json({ error: newUser.error.issues[0].message });
      }
      res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;
    try {
      const updateUser = await service.update(Number(id), body);
      if (!updateUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      if ('error' in updateUser) {
        return res.status(400).json({ error: updateUser.error.issues[0].message });
      }

      res.status(201).json(updateUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await service.delete(Number(id));
      if (!user) return res.status(404).json({ error: 'User not found.' });
      res.status(204).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
