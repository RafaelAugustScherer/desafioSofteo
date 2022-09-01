import { Router } from 'express';
import errorMiddleware from '../middleware/error';
import userRouter from './user';

const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use(errorMiddleware);

export default appRouter;