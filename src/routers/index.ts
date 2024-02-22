//
// Barrel Routers
import { Router } from 'express';
import ProductsRouter from './products.router';
import UsersRouter from './users.router';
import LoginRoter from './login.router';

const routers = Router();

routers.use('/products', ProductsRouter);

routers.use('/users', UsersRouter);

routers.use('/login', LoginRoter);

export default routers;