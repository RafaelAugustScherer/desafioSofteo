import { connect, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_CONNECTION_URI, NODE_ENV, DB_PORT } = process.env;


const defaultConnectionUri = NODE_ENV === 'development'
  ? `mongodb://localhost:${DB_PORT || 3002}`
  : DB_CONNECTION_URI;

const options: ConnectOptions = {
  dbName: 'desafio-softeo',
  autoIndex: true,
};

const connectToDatabase = (
  connectionUri = defaultConnectionUri || '',
  connectionOptions = options,
) => connect(connectionUri, connectionOptions, (err) => {
  if (err) {
    console.info(
      `ℹ️ Could not connect to MongoDB: ${err.message}`,
    );
  }
  else {
    console.info(
      'ℹ️ Successfully connected to MongoDB',
    );
  }
});

export default connectToDatabase;