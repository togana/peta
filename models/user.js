const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/peta');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
});

module.exports = mongoose.model('User', UserSchema);
