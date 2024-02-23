import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

const getAllUsers = async ():
Promise<ServiceResponse<{ username: string, productIds: number[] }[]>> => {
  try {
    const users = await UserModel.findAll({
      attributes: ['username'],
      include: [
        { model: ProductModel, as: 'productIds', attributes: ['id'] },
      ],
    });

    const formatData = users.map((user) => ({
      username: user.dataValues.username,
      productIds: user.dataValues.productIds?.map((product) => product.id) as number[],
    }));

    return { status: 'SUCCESSFUL', data: formatData, type: 'success' };
  } catch (error) {
    const newError = error as Error;
    return { status: 'NOT_FOUND', message: newError.message, type: 'error' };
  }
};

export default { getAllUsers };