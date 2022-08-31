import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('user', userSchema);