import { Router } from 'express';
import { OrdersController } from '../controllers';
import { OrdersMiddleware } from '../middlewares';

const ordersRouter = Router();

ordersRouter.get('/', OrdersController.getAllOrders);

ordersRouter.post('/', OrdersMiddleware.ordersValidate, OrdersController.createOrder);

export default ordersRouter;