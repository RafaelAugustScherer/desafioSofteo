import JWT from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (id: string | Types.ObjectId, user: string) => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw 'Define JWT_SECRET as an environment variable!';
  }

  const token = JWT.sign({ id, user }, JWT_SECRET, { expiresIn: '24h' });
  return token;
};

export default {
  generateToken,
};