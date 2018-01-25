import {Router, Request, Response, NextFunction} from 'express';

export class HealthCheckRouter {
    router: Router;

    /**
     * Initialize the HealthCheckRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    public checkHealth(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'Hello Bookshelf!'
        });
    }

    init() {
        this.router.get('/', this.checkHealth);
    }
}

// Create the HealthCheckRouter, and export its configured Express.Router
const healthCheckRouter = new HealthCheckRouter();
healthCheckRouter.init();

const router = healthCheckRouter.router;

export default router;