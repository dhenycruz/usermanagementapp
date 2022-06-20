import { Request, Response, NextFunction } from 'express';
import service from '../services/userService';

interface QuerySearch extends Request {
  query: {
    take: string,
    skip: string,
    query: string,
  }
}

class UserController {
  private _route: string;

  constructor() {
    this._route = '/users';
  }

  get route() { return this._route; }

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

  async getUsers(req: Request, res: Response) {
    const { take, skip } = req.query;

    try {
      const users = await service.getUsers(Number(take), Number(skip));
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUsersByQuery(req: QuerySearch, res: Response) {
    const { take, skip, query } = req.query;
    console.log(query);

    try {
      const users = await service
        .getUserByQuery(Number(take), Number(skip), query);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    if (!body.password) {
      return res.status(400).json({ error: 'Password is required.' });
    }
    try {
      const newUser = await service.create(body);
      if (!newUser) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if ('error' in newUser) {
        return res.status(400).json({ error: newUser.error });
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
        return res.status(400).json({ error: updateUser.error });
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
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async verifyEmailExists(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const user = await service.verifyEmailExists(body.email);
      if (user) {
        return res.status(401).json({ error: 'Email already registered' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    next();
  }

  async validateEmail(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    if (!body.email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const result = await service.validateEmail(body.email);

    if (!result) {
      return res.status(400).json({ error: 'Email invalid format.' });
    }

    next();
  }
}

export default UserController;
