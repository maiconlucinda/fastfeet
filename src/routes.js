import UserController from './app/controller/UserController';
import SessionsController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';

import authMiddleware from './app/middlewares/auth';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

routes.use(authMiddleware);
routes.put('/users:id', UserController.update);

export default routes;
