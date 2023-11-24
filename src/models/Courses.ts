import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ICourses extends Document {
    code: string,
    description: string,
    units: string,
    type: string
  };

 /** schema */
const CoursesSchema: Schema = new Schema({
    code: { type: String, required: true },
    description: { type: String, required: true },
    units: { type: String, required: true },
    type:{ type: String, required: true }
  });
  
export default mongoose.model<ICourses>('Courses', CoursesSchema);