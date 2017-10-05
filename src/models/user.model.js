import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create a schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// Hash the password before saving an instance of the User model
userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Add an instance method for validating the password of a User
userSchema.methods.isValidPassword = async function(inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// Create a model then export it immediately
export default mongoose.model('User', userSchema);
