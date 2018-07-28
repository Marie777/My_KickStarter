import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  userName: String,
  password: String,
  typePermission: String
});


const User = mongoose.model('User', UserSchema);

export default User;
