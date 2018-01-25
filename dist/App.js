"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const BookRouter_1 = require("./routes/BookRouter");
const HealthCheckRouter_1 = require("./routes/HealthCheckRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.errorHandling();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }
    // Configure API endpoints.
    routes() {
        this.express.use('/', HealthCheckRouter_1.default);
        this.express.use('/books', BookRouter_1.default);
    }
    errorHandling() {
        this.express.use(function (err, req, res, next) {
            console.error(err.stack);
            res.sendStatus(500);
        });
    }
}
exports.default = new App().express;
