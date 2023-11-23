import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface IUsers extends Document {
    username: string,
    password: string,
  };

 /** schema */
const UsersSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  });
  
export default mongoose.model<IUsers>('Users', UsersSchema);