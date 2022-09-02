import { Router } from 'express';
import ProcedureMiddleware from '../middleware/procedure';
import AuthMiddleware from '../middleware/auth';
import ProcedureController from '../controller/procedure';

const userRouter = Router();

userRouter.use(AuthMiddleware.validateToken);

userRouter.route('/')
  .get(
    ProcedureController.read,
  )
  .post(
    ProcedureMiddleware.validateCreate,
    ProcedureController.create,
  )
  .patch(
    ProcedureMiddleware.validateUpdate,
    ProcedureController.update,
  )
  .delete(
    ProcedureMiddleware.validateRemove,
    ProcedureController.remove,
  );

export default userRouter;