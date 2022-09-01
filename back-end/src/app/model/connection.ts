import { connect, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_CONNECTION_URI } = process.env;
const options: ConnectOptions = {
  dbName: 'desafio-softeo',
  autoIndex: true,
};

const connectToDatabase = (
  connectionUri = DB_CONNECTION_URI || '',
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