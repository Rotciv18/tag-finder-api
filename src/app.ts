import express, { Express } from 'express';

import routes from './routes';
import 'dotenv/config';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private routes() {
    this.server.use(routes);
  }

  private middlewares() {
    this.server.use(express.json());
  }
}

export default new App().server;
