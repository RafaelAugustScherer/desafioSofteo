import Procedure from '../interface/Procedure';
import ProcedureModel from '../model/procedure';
import ERRORS from '../utilities/error';

const create = async (payload: Procedure) => {
  const response = await ProcedureModel.create({ ...payload, paid: 0 });
  return response;
};

const read = async (userId: string) => {
  const response = await ProcedureModel.find({ userId });
  return response;
};

const update = async (procedureId: string, payload: Partial<Procedure>) => {
  const response = await ProcedureModel.findByIdAndUpdate(procedureId, payload, { new: true });

  if (!response) {
    throw ERRORS.PROCEDURE.NOT_FOUND;
  }

  return response;
};

const remove = async (procedureId: string) => {
  const response = await ProcedureModel.findByIdAndDelete(procedureId);

  if (!response) {
    throw ERRORS.PROCEDURE.NOT_FOUND;
  }
};

export default {
  read,
  create,
  update,
  remove,
};