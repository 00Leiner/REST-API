import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ICourses extends Document {
    code: string,
    description: string,
    units: string,
    labOrLec: string
  };

 /** schema */
const CoursesSchema: Schema = new Schema({
    code: { type: String, required: true },
    description: { type: String, required: true },
    units: { type: String, required: true },
    labOrLec:{ type: String, required: true }
  });
  
export default mongoose.model<ICourses>('Courses', CoursesSchema);