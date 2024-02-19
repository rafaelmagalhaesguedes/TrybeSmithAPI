import { Request, Response } from 'express';
import { addProduct, getAllProducts } from '../services/products.service';

// add new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Informe os dados para criar o produto' });
  }
};

// get all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  res.status(200).json(products);
};

export default { createProduct, getAllProducts };