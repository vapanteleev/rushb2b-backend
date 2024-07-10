import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
  role: 'supplier' | 'buyer';
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['supplier', 'buyer'], required: true },
}, { timestamps: true });

export default mongoose.model<UserDocument>('User', UserSchema);
