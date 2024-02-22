import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import LoginPayload from '../types/LoginPayload';
import { ServiceResponse } from '../types/ServiceResponse';
import { TokenGeneratedResponse } from '../types/TokenPayload';
import auth from '../utils/auth';

const authLogin = async (credentials: LoginPayload):
Promise<ServiceResponse<TokenGeneratedResponse>> => {
  const { username, password } = credentials;
  const user = await UserModel.findOne({ where: { username } });

  if (!user) {
    return { status: 'UNAUTHORIZED', message: 'Username or password invalid', type: 'error' };
  }

  const isValidPassword = bcrypt.compareSync(password, user.dataValues.password);
  
  if (!isValidPassword) {
    return { status: 'UNAUTHORIZED', message: 'Username or password invalid', type: 'error' };
  }

  const token = auth.sign({ id: user.dataValues.id, username: user.dataValues.username });

  return { status: 'SUCCESSFUL', data: { token }, type: 'success' };
};

export default { authLogin };