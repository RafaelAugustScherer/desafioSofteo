import { Router } from 'express';
import UserMiddleware from '../middleware/user';
import AuthMiddleware from '../middleware/auth';
import UserController from '../controller/user';

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

userRouter.route('/authenticate')
  .get(
    AuthMiddleware.validateToken,
    UserController.authenticate,
  );

export default userRouter;