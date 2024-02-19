import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

// add new product
export const addProduct = async (product: Product): Promise<Product> => {
  const newProduct = await ProductModel.create(product);
  return newProduct.get({ plain: true }) as Product;
};

// get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();
  return products.map((product) => product.get({ plain: true })) as Product[];
};

export default { addProduct, getAllProducts };