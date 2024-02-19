import { Request, Response } from 'express';
import { addProduct } from '../services/products.service';

// add new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Informe os dados para criar o produto' });
  }
};

export default { createProduct };