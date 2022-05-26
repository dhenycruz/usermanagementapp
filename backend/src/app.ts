import express from 'express';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public startServer(PORT: string | number = 3001): void {
    this.app.listen(PORT, () => {
      console.log(`Server running in the port ${PORT}`);
    });
  }

}

export default App;