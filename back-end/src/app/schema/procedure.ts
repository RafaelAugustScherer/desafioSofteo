import Joi from 'joi';
import JoiDate from '@joi/date';

const JoiExtended = Joi.extend(JoiDate);

const create = JoiExtended.object({
  client: JoiExtended.string().min(2).required(),
  procedure: JoiExtended.string().min(2).required(),
  total: JoiExtended.number().positive().required(),
  entry: JoiExtended.number().positive().allow(0).required(),
  installments: JoiExtended.number().integer().max(36).positive().allow(0).required(),
  paymentDates: JoiExtended.array().items(JoiExtended.date().format('DD/MM/YYYY')).required(),
});

const update = JoiExtended.object({
  id: JoiExtended.string().hex().length(24).required(),
  paid: JoiExtended.number().integer().positive().max(36),
});

const remove = JoiExtended.object({
  id: JoiExtended.string().hex().length(24).required(),
});

export default {
  create,
  update,
  remove,
};