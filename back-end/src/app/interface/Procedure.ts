import { Types } from 'mongoose';

interface Procedure {
  id?: Types.ObjectId | string,
  userId: string,
  client: string,
  procedure: string,
  total: number,
  entry: number,
  installments: number,
  paid: number,
  paymentDates: string[] | Date[],
}

export default Procedure;