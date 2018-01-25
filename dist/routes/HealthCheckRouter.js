"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HealthCheckRouter {
    /**
     * Initialize the HealthCheckRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    checkHealth(req, res, next) {
        res.json({
            message: 'Hello Bookshelf!'
        });
    }
    init() {
        this.router.get('/', this.checkHealth);
    }
}
exports.HealthCheckRouter = HealthCheckRouter;
// Create the HealthCheckRouter, and export its configured Express.Router
const healthCheckRouter = new HealthCheckRouter();
healthCheckRouter.init();
const router = healthCheckRouter.router;
exports.default = router;
