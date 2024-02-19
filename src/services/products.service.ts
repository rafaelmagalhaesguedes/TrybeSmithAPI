import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';

// add new product
export const addProduct = async (product: Product): Promise<Product> => {
  const newProduct = await ProductModel.create(product);
  
  return newProduct.get({ plain: true }) as Product;
};

export default { addProduct };