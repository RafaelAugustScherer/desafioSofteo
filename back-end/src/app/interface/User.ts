import { Types } from 'mongoose';

interface User {
  _id?: Types.ObjectId,
  user: string,
  password: string,
}

export default User;