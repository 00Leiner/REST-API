import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ICurriculums extends Document {
    program: string,
    year: string,
    semester: string,
    major: string,
    curriculum: Array<{
      code: string;
      description: string;
      units: string;
      type: string;
    }>;
  };

 /** schema */
const CurriculumsSchema: Schema = new Schema({
    program: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    major: { type: String, required: true },
    curriculum: [
      {
        code: { type: String, required: true },
        description: { type: String, required: true },
        units: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  });
  
export default mongoose.model<ICurriculums>('Curriculums', CurriculumsSchema);