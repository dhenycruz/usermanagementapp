import UserController from './controllers/userController';
import UserRouter from './routes/userRouter';
import App from './app';

const userController = new UserController();
const userRouter = new UserRouter();

userRouter.addRoute(userController);

App.addRouter(userRouter.router);

App.startServer();

export default App;