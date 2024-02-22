import { Router } from 'express';
import { ProductsController } from '../controllers';

const productRouter = Router();

productRouter.post('/', ProductsController.createProduct);
productRouter.get('/', ProductsController.getProducts);

export default productRouter;