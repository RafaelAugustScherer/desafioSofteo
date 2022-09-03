import { RequestHandler } from 'express';
import UserService from '../service/user';
import AuthUtilities from '../utilities/auth';

const create: RequestHandler = async (req ,res) => {
  const response = await UserService.create(req.body);
  return res.status(201).json(response);
};

const login: RequestHandler = async (req, res) => {
  const { _id, user } = await UserService.login(req.body);
  const token = AuthUtilities.generateToken(_id, user);

  return res.status(200).json({ token });
};


export default {
  create,
  login,
};