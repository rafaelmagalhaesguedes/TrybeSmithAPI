import { Model, FindOptions } from 'sequelize';
import OrderModel, { OrderInputtableTypes } from '../database/models/order.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Orders } from '../types/Orders';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

const buildFindOptions = (): FindOptions => ({
  attributes: { exclude: ['productId', 'userId'] },
  include: [
    {
      model: UserModel,
      as: 'User',
      attributes: { exclude: ['id', 'password'] },
    },
    {
      model: ProductModel,
      as: 'Product',
      attributes: { exclude: ['id', 'userId'] },
    },
  ],
});

const getAll = async ():
Promise<ServiceResponse<Model<Orders, OrderInputtableTypes>[]>> => {
  try {
    const orders = await OrderModel.findAll(buildFindOptions());
    return { status: 'SUCCESSFUL', data: orders, type: 'success' };
  } catch (error) {
    const newError = error as Error;
    return { status: 'NOT_FOUND', message: newError.message, type: 'error' };
  }
};

const create = async (order: OrderInputtableTypes):
Promise<ServiceResponse<Model<Orders, OrderInputtableTypes>>> => {
  const user = await UserModel.findByPk(order.userId);
  if (!user) return { status: 'NOT_FOUND', message: 'User not found', type: 'error' };
  
  const product = await ProductModel.findByPk(order.productId);
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found', type: 'error' };

  try {
    const newOrder = await OrderModel.create(order);
    return { status: 'CREATED', data: newOrder, type: 'success' };
  } catch (error) {
    const newError = error as Error;
    return { status: 'INTERNAL_ERROR', message: newError.message, type: 'error' };
  }
};

export default { getAll, create };