import { Router } from 'express';
import UserMiddleware from '../middleware/user';
import UserController from '../controller/user';
import AuthMiddleware from '../middleware/auth';

const userRouter = Router();

userRouter.route('/register')
  .post(
    UserMiddleware.validateCreate,
    UserController.create,
  );

userRouter.route('/login')
  .post(
    UserMiddleware.validateLogin,
    UserController.login,
  );
  

export default userRouter;