import UserController from './controllers/userController';
import UserRouter from './routes/userRouter';
import App from './app';

require('dotenv').config();

const { PORT } = process.env;

const userController = new UserController();
const userRouter = new UserRouter();

userRouter.addRoute(userController);

App.addRouter(userRouter.router);

App.startServer(PORT);

export default App;
