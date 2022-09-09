import Procedure from '../interface/Procedure';
import ProcedureModel from '../model/procedure';
import UserModel from '../model/user';
import ERRORS from '../utilities/error';

const verifyProcedureOwnership = async (userId: string, procedureId: string) => {
  const procedure = await ProcedureModel.findById(procedureId);

  if (!procedure || String(procedure.userId) !== userId) {
    throw ERRORS.PROCEDURE.NOT_FOUND;
  }
};

const create = async (userId: string, payload: Procedure) => {
  const userExists = await UserModel.findById(userId);
  if (!userExists) {
    throw ERRORS.USER.NOT_FOUND;
  }

  const response = await ProcedureModel.create({ ...payload, paid: 0 });
  return response;
};

const read = async (userId: string) => {
  const response = await ProcedureModel.find({ userId });
  return response;
};

const update = async (userId: string, payload: Partial<Procedure>) => {
  const procedureId = payload.id as string;
  delete payload.id;

  await verifyProcedureOwnership(userId, procedureId);

  const response = await ProcedureModel.findByIdAndUpdate(procedureId, payload, { new: true });
  return response;
};

const remove = async (userId: string, procedureId: string) => {
  await verifyProcedureOwnership(userId, procedureId);
  await ProcedureModel.findByIdAndDelete(procedureId);
};

export default {
  read,
  create,
  update,
  remove,
};