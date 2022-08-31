import { connect, ConnectOptions } from 'mongoose';

const {
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.gfw2a.mongodb.net/?retryWrites=true&w=majority`;

const options: ConnectOptions = {
  dbName: 'desafio-softeo',
  autoIndex: true,
};

const connectToDatabase = (
  connectionUri = uri,
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