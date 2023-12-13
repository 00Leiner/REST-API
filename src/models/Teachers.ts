import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ITeachers extends Document {
    name: string,
    specialized: Array<{
      code: string;
      description: string;
      units: string;
      type: string;
    }>;
  };

 /** schema */
const TeachersSchema: Schema = new Schema({
    name: { type: String, required: true },
    specialized: [
      {
        code: { type: String, required: true },
        description: { type: String, required: true },
        units: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  });
  
export default mongoose.model<ITeachers>('Teachers', TeachersSchema);