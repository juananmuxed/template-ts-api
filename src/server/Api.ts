import express, { Application } from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';

import { useLoggerServer } from '@config/UseLoggerServer';
import { db, dbHost, dbTable } from '@db/Connection';
import { apiPaths, setRoutes } from '@routes/Main';
import { syncDatabase } from '@db/Sync';
import { seedDatabase } from '@db/Seed';
import { useSwagger } from '@middlewares/Swagger';
import { logError, useDefaultErrorHandler, useErrorHandler } from '@middlewares/ErrorHandler';

const log = useLoggerServer();

export class Server {
  private app: Application;

  private port: string | number;

  private host: string;

  constructor() {
    this.app = express();
    this.port = process.env.API_PORT || 3000;
    this.host = process.env.API_HOST || 'localhost';
  }

  async init() {
    this.dbConnection();
    this.middleWares();
    this.routes();
    this.swagger();
    this.errorHandler();
    await this.syncDatabase();
    await this.seedDatabase();
    this.listen();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      log.dbConnected(`Host:${dbHost} / Table:${dbTable}`);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  middleWares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    setRoutes(this.app);
  }

  async syncDatabase() {
    try {
      await syncDatabase();
      log.simpleMessage('🗃️  Database sync', 'magenta');
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async seedDatabase() {
    try {
      await seedDatabase();
      log.simpleMessage('🌱 Database initial seed', 'yellow');
    } catch (error) {
      throw new Error(error as string);
    }
  }

  swagger() {
    this.app.use(apiPaths.docs, swaggerUI.serve, swaggerUI.setup(useSwagger(), {
      swaggerOptions: {
        docExpansion: 'none',
      },
    }));
  }

  errorHandler() {
    this.app.use(useDefaultErrorHandler);
    this.app.use(logError);
    this.app.use(useErrorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      log.serverStart({ port: this.port, host: this.host });
    });
  }
}
