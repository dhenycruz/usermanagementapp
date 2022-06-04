import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDoc = require('./swagger.json');

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }

  startServer(PORT: string | number = 3001): void {
    this.app.listen(PORT, () => {
      console.log(`Server running in the port ${PORT}`);
    });
  }

  addRouter(router: Router) {
    this.app.use(router);
  }

  getApp() {
    return this.app;
  }
}

export default new App();
