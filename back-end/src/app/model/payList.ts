import { model, Schema } from 'mongoose';

const payListSchema = new Schema({
  client: {
    type: String,
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
  nextPaymentDate: {
    type: Date,
    required: true,
  },
});

export default model('payList', payListSchema);