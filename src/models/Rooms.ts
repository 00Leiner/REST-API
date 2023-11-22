import mongoose, { Document, Schema } from 'mongoose';

/** document */
export interface IRooms extends Document {
    name: string,
    type: string,
  };

 /** schema */
const RoomsSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
  });
  
export default mongoose.model<IRooms>('Rooms', RoomsSchema);