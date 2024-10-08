import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;  
  friends: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },  
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true 
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
