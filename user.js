const { generateToken } = require('./auth-token');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  }
});

userSchema.statics.createAuthenticated = async function(user) {
  const { password } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  return await this.create(user);
};

userSchema.statics.getAuthenticated = async function({ username, password }) {
  const existingUser = await this.findOne({ username });
  if (!existingUser)
    return null;

  const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
  if (isCorrectPassword) {
    const payload = { userId: existingUser.id };
    existingUser.token =  await generateToken(payload);
    return existingUser;
  } else {
    return null;
  }
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);