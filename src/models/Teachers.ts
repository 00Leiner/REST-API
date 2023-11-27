import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ITeachers extends Document {
    name: string,
    specialized: string
  };

 /** schema */
const TeachersSchema: Schema = new Schema({
    name: { type: String, required: true },
    specialized: { type: String, required: true }
  });
  
export default mongoose.model<ITeachers>('Teachers', TeachersSchema);