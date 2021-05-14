import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

import './database/index';

class App {
    constructor() {
        this.server = express();
        this.config();
        this.middlewares();
        this.routers();
    }

    config() {
        this.server.use(express.json());

        dotenv.config({
            path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
        });

    }

    middlewares() {
    }

    routers() {
        this.server.use(routes);
    }
}

export default new App().server;