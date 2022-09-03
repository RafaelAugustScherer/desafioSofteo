import Express from 'express';
import Cors from 'cors';
import 'express-async-errors';
import connectToDatabase from './model/connection';
import appRouter from './router';

const App = Express();
App.use(Express.json());
App.use(Cors());
App.use(appRouter);

connectToDatabase();

export default App;