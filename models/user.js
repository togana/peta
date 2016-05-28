const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(config.mongo.connection);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
});

module.exports = mongoose.model('User', UserSchema);
