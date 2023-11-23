import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt'

/** document */
export interface IUsers extends Document {
  username: string,
  password: string,
};

 /** schema */
export const UsersSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Hash the password before saving it to the database
UsersSchema.pre<IUsers>('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password along with the new salt
    const hash = await bcrypt.hash(user.password, salt);

    // Override the cleartext password with the hashed one
    user.password = hash;
    next();
  } catch (error: any) {
    return next(error);
  }
});

export default mongoose.model<IUsers>('Users', UsersSchema);
