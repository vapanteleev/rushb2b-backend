import mongoose, { Document, Schema } from 'mongoose';

interface Activity {
  code: string;
  name: string;
}
export interface UserDocument extends Document {
  username: string;
  password: string;
  role: 'supplier' | 'buyer';
  activities: Activity[];
  phoneNumber: string;
  productTypes: { code: string; name: string }[];
  country: string;

}
const ActivitySchema: Schema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
});
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['supplier', 'buyer'], required: true },
  activities: { type: [ActivitySchema], required: true },
  phoneNumber: { type: String, required: true },
  productTypes: { type: [String], required: true }, // массив строк
  country: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model<UserDocument>('User', UserSchema);
