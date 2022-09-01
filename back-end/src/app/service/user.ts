import User from '../interface/User';
import UserModel from '../model/user';
import UserUtilities from '../utilities/user';
import ERRORS from '../utilities/error';

const create = async (payload: User): Promise<Partial<User>> => {
  const isAlreadyCreated = await UserModel.findOne(
    { user: payload.user },
  );
  if (isAlreadyCreated) {
    throw ERRORS.USER.ALREADY_EXISTS;
  }

  const response = await UserModel.create({
    ...payload,
    password: UserUtilities.hashPassword(payload.password) },
  );
  const user: Partial<User> = response.toObject();
  delete user.password;

  return user;
};

const login = async (payload: User): Promise<void> => {
  const response = await UserModel.findOne({
    user: payload.user,
    password: UserUtilities.hashPassword(payload.password),
  });

  if (!response) {
    throw ERRORS.AUTH.INVALID_CREDENTIALS;
  }
};

export default {
  create,
  login,
};