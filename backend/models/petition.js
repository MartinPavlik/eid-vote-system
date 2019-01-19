const mongoose = require('mongoose');
const bluebird = require('bluebird');


mongoose.Promise = bluebird.Promise;
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const petitionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  ownerId: {
    type: ObjectId,
    ref: 'user',
  },
}, {
  collection: 'petition',
  timestamps: true,
});

export default mongoose.model('petition', petitionSchema);
