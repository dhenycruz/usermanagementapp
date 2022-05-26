import { Request, Response } from 'express';
import UserService from '../services/userService';

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  badRequest = 'Bad request',
 }

class UserController {
  private _route:  string;
  private service: UserService;
  private errors = ControllerErrors;

  constructor() {
    this._route = '/users';
    this.service = new UserService();
  }

  get route() { return this._route }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const users = await this.service.getUser(Number(id));
      return users
        ? res.status(200).json(users)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async getUsers(_req: Request, res: Response) {
    try {
      const users = await this.service.getUsers();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const newUser = await this.service.create(body);
      if (!newUser) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if('error' in newUser) {
        return res.status(400).json(newUser);
      }
      res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async update(req: Request, res: Response) {
    const { body } = req;
    const { id } = req.params;
    try {
      const updateUser = await this.service.update(Number(id), body);
      if (!updateUser) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in updateUser) {
        return res.status(400).json(updateUser);
      }

      res.status(201).json(updateUser);
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await this.service.delete(Number(id));
      return user 
        ? res.status(204)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }
}

export default UserController;
