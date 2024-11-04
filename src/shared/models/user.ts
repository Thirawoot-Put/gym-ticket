import mongoose, { Schema } from 'mongoose';

interface IUser {
  id: string
  userName: string
  password: string
  _isActive: boolean
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  userName: { type: String, require: true },
  password: { type: String, require: true },
  _isActive: { type: Boolean, require: true }
});

const UserModel = mongoose.model('Blog', UserSchema);
export default UserModel;
