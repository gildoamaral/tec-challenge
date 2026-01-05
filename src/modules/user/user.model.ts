import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
};

const userSchema = new Schema<UserDocument>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      index: true 
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
