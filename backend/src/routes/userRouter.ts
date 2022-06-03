import { Router } from 'express';
import UserController from '../controllers/userController';

class UserRouter {
  public router: Router;

  constructor () {
    this.router = Router();
  }

  addRoute(
    controller: UserController,
    route:string = controller.route,
  ) {
    this.router.get(route, controller.getUsers);
    this.router.get(`${route}/:id`, controller.getUser);
    this.router.post(route, controller.validateEmail, controller.verifyEmailExists, controller.create);
    this.router.put(`${route}/:id`, controller.validateEmail, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

export default UserRouter;
