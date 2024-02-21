import { Request, Response } from 'express';
import { getAllUsers } from '../services/users.service';
import statusHTTP from '../utils/httpStatusMap';

export const getUsers = async (req: Request, res: Response) => {
  const { type, message, data } = await getAllUsers();

  if (type === 'error') {
    return res.status(statusHTTP('INTERNAL_ERROR')).json({ message });
  }

  return res.status(statusHTTP('SUCCESSFUL')).json(data);
};

export default { getUsers };
