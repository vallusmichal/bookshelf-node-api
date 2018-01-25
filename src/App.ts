import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import bookRouter from './routes/BookRouter'
import healthCheckRouter from './routes/HealthCheckRouter'

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.errorHandling();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true}));
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/', healthCheckRouter);
        this.express.use('/books', bookRouter);
    }

    private errorHandling(): void {
        this.express.use(function(err, req, res, next) {
            console.error(err.stack);
            res.sendStatus(500);
        });
    }
}

export default new App().express;