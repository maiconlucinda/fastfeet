import UserController from './app/controller/UserController';
import SessionsController from './app/controller/SessionController';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionsController.store);

export default routes;
