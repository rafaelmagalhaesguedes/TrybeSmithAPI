import { Router } from 'express';
import { ProductsController } from '../controllers';
import { NameMiddleware, PriceMiddleware, UserIdMiddleware } from '../middlewares';

const productRouter = Router();

productRouter.post(
  '/',
  NameMiddleware.validateProductName,
  UserIdMiddleware.validateProductUserId,
  PriceMiddleware.validateProductPrice,
  ProductsController.createProduct,
);

productRouter.get('/', ProductsController.getProducts);

export default productRouter;