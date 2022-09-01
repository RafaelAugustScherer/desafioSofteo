import { RequestHandler } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import ERRORS from '../utilities/error';

const validateToken: RequestHandler = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    throw ERRORS.AUTH.TOKEN_NOT_FOUND;
  }
  
  try {
    const { user } = JWT.decode(token) as JwtPayload;
    res.locals.user = user;
  } catch (e) {
    throw ERRORS.AUTH.INVALID_TOKEN;
  }

  return next();
};

const generateToken: RequestHandler = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { user } = req.body;

  if (!JWT_SECRET) {
    return next('Define JWT_SECRET as an environment variable!');
  }

  const token = JWT.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
  res.locals.token = token;

  return next();
};

export default {
  validateToken,
  generateToken,
};