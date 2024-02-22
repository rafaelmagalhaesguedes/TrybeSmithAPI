import { Request, Response } from 'express';
import { UsersService } from '../services';
import statusHTTP from '../utils/httpStatusMap';

const getUsers = async (req: Request, res: Response) => {
  const { type, message, data } = await UsersService.getAllUsers();

  if (type === 'error') {
    return res.status(statusHTTP('INTERNAL_ERROR')).json({ message });
  }

  return res.status(statusHTTP('SUCCESSFUL')).json(data);
};

export default { getUsers };
