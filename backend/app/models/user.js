const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Please provide the username'
  },
  password: {
    type: String,
    required: 'Please provide the password'
  },
  role: {
    type: String,
    required: 'Please provide the role'
  },

});

// Remove password and __v every time we return a user object
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

module.exports = mongoose.model('User', UserSchema);
