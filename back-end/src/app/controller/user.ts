import { RequestHandler } from 'express';
import UserService from '../service/user';

const create: RequestHandler = async (req ,res) => {
  const response = await UserService.create(req.body);
  return res.status(201).json(response);
};

const login: RequestHandler = async (req, res) => {
  const { token } = res.locals;
  await UserService.login(req.body);

  return res.status(200).json({ token });
};


export default {
  create,
  login,
};