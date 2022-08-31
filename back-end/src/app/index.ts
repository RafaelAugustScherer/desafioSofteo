import App from './app';
import 'dotenv';

const PORT = process.env.APP_PORT || 3001;

App.listen(
  +PORT,
  () => console.log('Back-end running at', PORT),
);