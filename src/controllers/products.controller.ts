import { Request, Response } from 'express';
import { ProductsService } from '../services';
import statusHTTP from '../utils/httpStatusMap';

// add new product
const createProduct = async (req: Request, res: Response) => {
  const { type, data, message } = await ProductsService.addProduct(req.body);

  if (type !== 'success') {
    return res.status(statusHTTP('INVALID_VALUE')).json({ message });
  }

  return res.status(statusHTTP('CREATED')).json(data);
};

// get all products
const getProducts = async (req: Request, res: Response) => {
  const { type, data, message } = await ProductsService.getAllProducts();

  if (type !== 'success') {
    return res.status(statusHTTP('NOT_FOUND')).json({ message });
  }

  return res.status(statusHTTP('SUCCESSFUL')).json(data);
};

export default { createProduct, getProducts };