const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String, // TODO: 後でシリアライズする
  admin: Boolean,
});

module.exports = mongoose.model('User', UserSchema);
