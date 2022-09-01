import Joi from 'joi';

const create = Joi.object({
  user: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  user: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
});

export default {
  create,
  login,
};