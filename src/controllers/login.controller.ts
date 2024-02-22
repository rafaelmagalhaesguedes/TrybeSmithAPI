import { Request, Response } from 'express';
import statusHTTP from '../utils/httpStatusMap';
import { LoginService } from '../services';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { type, data, message } = await LoginService.authLogin({ username, password });

  if (type !== 'success') {
    return res.status(statusHTTP('UNAUTHORIZED')).json({ message });
  }

  return res.status(statusHTTP('SUCCESSFUL')).json(data);
};

export default { login };