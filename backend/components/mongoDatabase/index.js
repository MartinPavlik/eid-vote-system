
import mongoose from 'mongoose';
import config from '../../config';

const connect = () => {
  const options = { useMongoClient: true, keepAlive: 1 };
  mongoose.connect(config.mongo.uri, options);
  if (config.mongo.debug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      console.log(`date: ${new Date()}, collection name: ${collectionName}, method: ${method}, query: ${JSON.stringify(query)}, doc: ${JSON.stringify(doc)} #####`);
    });
  }
  return true;
};

export default {
  connect: () => {
    mongoose.connection.on('error', (err) => { console.log(err); });
    mongoose.connection.on('connected', () => { console.log('connected to mongodb server.'); });
    mongoose.connection.on('disconnected', () => {
      console.log('disconnected from mongodb server.');
      setTimeout(() => {
        connect();
      }, 5000);
    });
    connect();
  },
};
