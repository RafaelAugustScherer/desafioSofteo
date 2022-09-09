import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();

const verifyToken = (token: string) => {
  try {
    JWT.decode(token);
    return true;
  } catch(e) {
    return false;
  }
};

const generateMockToken = () => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw 'Define JWT_SECRET as an environment variable!';
  }

  return JWT.sign({ user: 'FakeUser' }, JWT_SECRET);
};

export {
  verifyToken,
  generateMockToken,
};