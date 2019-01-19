const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird.Promise;
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const petitionVoteSchema = new Schema({
  petitionId: {
    type: ObjectId,
    ref: 'petition',
  },
  userId: {
    type: ObjectId,
    ref: 'user',
  },
  comment: {
    type: String,
    default: '',
  },
}, {
  collection: 'petitionVote',
  timestamps: true,
});

export default mongoose.model('petitionVote', petitionVoteSchema);
