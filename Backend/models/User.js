import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'agent', 'admin'], default: 'student' }
});

export default mongoose.model('User', UserSchema);
