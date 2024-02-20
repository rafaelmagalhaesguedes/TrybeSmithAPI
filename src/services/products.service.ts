import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Product } from '../types/Product';

// add new product
export const addProduct = async (product: Product)
: Promise<ServiceResponse<Model<Product, ProductInputtableTypes>>> => {
  try {
    const newProduct = await ProductModel.create(product) as Model<Product, ProductInputtableTypes>;
    return {
      status: 'CREATED',
      data: newProduct as Model<Product, ProductInputtableTypes>,
      type: 'success',
    };
  } catch (error) {
    const newError = error as Error;
    return { status: 'INTERNAL_ERROR', message: newError.message, type: 'error' };
  }
};

// get all products
export const getAllProducts = async ()
: Promise<ServiceResponse<Model<Product, ProductInputtableTypes>[]>> => {
  try {
    const products = await ProductModel.findAll() as Model<Product, ProductInputtableTypes>[];
    return { status: 'SUCCESSFUL', data: products, type: 'success' };
  } catch (error) {
    const newError = error as Error;
    return { status: 'NOT_FOUND', message: newError.message, type: 'error' };
  }
};

export default { addProduct, getAllProducts };