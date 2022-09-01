import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  if (err.isJoi) {
    const { message: error } = err.details[0];
    return res.status(400).json({ error });
  }
  if (err.isExpected) {
    const { status, message: error } = err;
    return res.status(status).json({ error });
  }

  console.error(err);
  return res.status(500).end();
};

export default errorMiddleware;