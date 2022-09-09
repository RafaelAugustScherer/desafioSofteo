import { Types } from 'mongoose';

interface User {
  _id?: Types.ObjectId | string,
  user: string,
  password: string,
}

export default User;