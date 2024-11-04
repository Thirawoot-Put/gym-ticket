import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: Number,
  userName: String,
  password: String,
  _isActive: Boolean
});

const Blog = mongoose.model('Blog', userSchema);
export default Blog;
