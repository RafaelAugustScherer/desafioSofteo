import { RequestHandler } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import ERRORS from '../utilities/error';

const validateToken: RequestHandler = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    throw ERRORS.AUTH.TOKEN_NOT_FOUND;
  }
  
  try {
    const { id, user } = JWT.decode(token) as JwtPayload;
    res.locals.id = id;
    res.locals.user = user;
  } catch (e) {
    throw ERRORS.AUTH.INVALID_TOKEN;
  }

  return next();
};

export default {
  validateToken,
};