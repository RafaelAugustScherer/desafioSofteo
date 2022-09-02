import { Router } from 'express';
import errorMiddleware from '../middleware/error';
import userRouter from './user';
import procedureRouter from './procedure';

const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/procedure', procedureRouter);
appRouter.use(errorMiddleware);

export default appRouter;