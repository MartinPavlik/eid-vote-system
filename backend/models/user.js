const mongoose = require('mongoose');
const bluebird = require('bluebird');


mongoose.Promise = bluebird.Promise;
const { Schema } = mongoose;

const userSchema = new Schema({
  documentNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
}, {
  collection: 'user',
  timestamps: true,
});

export default mongoose.model('user', userSchema);
