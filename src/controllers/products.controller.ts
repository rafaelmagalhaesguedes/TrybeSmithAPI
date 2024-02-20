import { Request, Response } from 'express';
import { addProduct, getAllProducts } from '../services/products.service';
import statusHTTP from '../utils/httpStatusMap';

// add new product
export const createProduct = async (req: Request, res: Response) => {
  const { type, data, message } = await addProduct(req.body);

  if (type !== 'success') {
    return res.status(statusHTTP('UNAUTHORIZED')).json({ message });
  }

  return res.status(statusHTTP('CREATED')).json(data);
};

// get all products
export const getProducts = async (req: Request, res: Response) => {
  const { type, data, message } = await getAllProducts();

  if (type !== 'success') {
    return res.status(statusHTTP('NOT_FOUND')).json({ message });
  }

  return res.status(statusHTTP('SUCCESSFUL')).json(data);
};

export default { createProduct, getAllProducts };