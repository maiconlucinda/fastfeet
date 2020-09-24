import UserController from './app/controller/UserController';
import SessionsController from './app/controller/SessionController';

import authMiddleware from './app/middlewares/auth';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;
