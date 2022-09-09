import { RequestHandler } from 'express';
import Procedure from '../interface/Procedure';
import ProcedureService from '../service/procedure';

const create: RequestHandler = async (req, res) => {
  const { id: userId } = res.locals;
  const payload = { ...req.body, userId } as Procedure;

  const response = await ProcedureService.create(userId, payload);
  return res.status(201).json(response);
};

const read: RequestHandler = async (_req, res) => {
  const { id } = res.locals;
  const response = await ProcedureService.read(id);
  
  return res.status(200).json(response);
};

const update: RequestHandler = async (req, res) => {
  const { id: userId } = res.locals;
  const payload = req.body as Partial<Procedure>;

  const response = await ProcedureService.update(userId, payload);
  return res.status(200).json(response);
};

const remove: RequestHandler = async (req, res) => {
  const { id: userId } = res.locals;
  const { id: procedureId } = req.body;
  await ProcedureService.remove(userId, procedureId);

  return res.status(204).end();
};

export default {
  create,
  read,
  update,
  remove,
};