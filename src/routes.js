import UserController from './app/controller/UserController';

const { Router } = require('express');

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
