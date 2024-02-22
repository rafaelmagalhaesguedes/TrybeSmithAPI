import { Router } from 'express';
import { LoginController } from '../controllers';
import auth from '../middlewares/auth.middleware';

const loginRouter = Router();

loginRouter.post('/', auth.login, LoginController.login);

export default loginRouter;