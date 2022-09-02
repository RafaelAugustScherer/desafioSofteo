import { model, Schema, Types } from 'mongoose';

const procedureSchema = new Schema({
  client: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  procedure: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  entry: {
    type: Number,
    required: true,
  },
  installments: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  paymentDates: {
    type: [String],
    required: true,
  },
},
{
  versionKey: false,
});

export default model('procedures', procedureSchema);