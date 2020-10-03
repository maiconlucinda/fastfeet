import UserController from './app/controller/UserController';
import SessionsController from './app/controller/SessionController';
import RecipientController from './app/controller/RecipientController';

import authMiddleware from './app/middlewares/auth';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);
routes.put('/users:id', UserController.update);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

export default routes;
