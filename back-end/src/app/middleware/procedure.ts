import { RequestHandler } from 'express';
import ProcedureSchema from '../schema/procedure';

const validateCreate: RequestHandler = async (req, _res, next) => {
  await ProcedureSchema.create.validateAsync(req.body);
  return next();
};

const validateUpdate: RequestHandler = async (req, _res, next) => {
  await ProcedureSchema.update.validateAsync(req.body);
  return next();
};

const validateRemove: RequestHandler = async (req, _res, next) => {
  await ProcedureSchema.remove.validateAsync(req.body);
  return next();
};

export default {
  validateCreate,
  validateUpdate,
  validateRemove,
};