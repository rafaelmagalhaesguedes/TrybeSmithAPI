import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Product } from '../types/Product';
import UserModel from '../database/models/user.model';

// add new product
export const addProduct = async (product: Product):
Promise<ServiceResponse<Model<Product, ProductInputtableTypes>>> => {
  const userExists = await UserModel.findOne({ where: { id: product.userId } });

  if (!userExists) {
    return { status: 'INVALID_VALUE', message: '"userId" not found', type: 'error' };
  }
  
  try {
    const newProduct = await ProductModel.create(product);
    return { status: 'CREATED', data: newProduct, type: 'success' };
  } catch (error) {
    const newError = error as Error;
    return { status: 'INVALID_VALUE', message: newError.message, type: 'error' };
  }
};

// get all products
export const getAllProducts = async ():
Promise<ServiceResponse<Model<Product, ProductInputtableTypes>[]>> => {
  try {
    const products = await ProductModel.findAll();
    return { status: 'SUCCESSFUL', data: products, type: 'success' };
  } catch (error) {
    const newError = error as Error;
    return { status: 'NOT_FOUND', message: newError.message, type: 'error' };
  }
};

export default { addProduct, getAllProducts };