import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface ISchedule extends Document {
    program: string,
    year: string,
    semester: string,
    block: string,
    sched: Array<{
        courseCode: string,
        courseDescription: string,
        courseUnit: string,
        day: string,
        time: string, 
        room: string,
        instructor: string,
      }>;
  };

 /** schema */
const ScheduleSchema: Schema = new Schema({
    program: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    block: { type: String, required: true },
    sched: [
      {
        courseCode: { type: String, required: true },
        courseDescription: { type: String, required: true },
        courseUnit: { type: String, required: true },
        day: { type: String, required: true },
        time: { type: String, required: true },
        room: { type: String, required: true },
        instructor: { type: String, required: true },
      },
    ]
  });
  
export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);