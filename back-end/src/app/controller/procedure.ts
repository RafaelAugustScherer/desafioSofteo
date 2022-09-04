import { RequestHandler } from 'express';
import Procedure from '../interface/Procedure';
import ProcedureService from '../service/procedure';

const create: RequestHandler = async (req, res) => {
  const payload = { ...req.body, userId: res.locals.id } as Procedure;

  const response = await ProcedureService.create(payload);
  return res.status(201).json(response);
};

const read: RequestHandler = async (req, res) => {
  const { id } = res.locals;
  const response = await ProcedureService.read(id);
  
  return res.status(200).json(response);
};

const update: RequestHandler = async (req, res) => {
  const payload = req.body as Procedure;
  const response = await ProcedureService.update(payload);
  return res.status(200).json(response);
};

const remove: RequestHandler = async (req, res) => {
  const { id } = req.body;
  await ProcedureService.remove(id);

  return res.status(204).end();
};

export default {
  create,
  read,
  update,
  remove,
};