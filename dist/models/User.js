import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
});
const User = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['supplier', 'buyer'], required: true },
    activities: { type: [ActivitySchema], required: true },
    phoneNumber: { type: String, required: true },
    productTypes: { type: [String], required: true },
    country: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model('User', User);
//# sourceMappingURL=User.js.map