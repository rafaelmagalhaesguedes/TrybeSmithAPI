import { Request, Response } from 'express';
import { addProduct, getAllProducts } from '../services/products.service';
import statusHTTP from '../utils/httpStatusMap';

// add new product
export const createProduct = async (req: Request, res: Response) => {
  const response = await addProduct(req.body);

  if (response.type !== 'success') {
    return res.status(statusHTTP('UNAUTHORIZED')).json({ message: response.message });
  }

  return res.status(statusHTTP('CREATED')).json(response.data);
};

// get all products
export const getProducts = async (req: Request, res: Response) => {
  const response = await getAllProducts();

  if (response.type !== 'success') {
    return res.status(statusHTTP('NOT_FOUND')).json({ message: response.message });
  }

  return res.status(statusHTTP('SUCCESSFUL')).json(response.data);
};

export default { createProduct, getAllProducts };