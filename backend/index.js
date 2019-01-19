import { path } from 'ramda';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { schema } from './graphql';
import mongoDatabase from './components/mongoDatabase';

const http = require('http');
const { ApolloServer } = require('apollo-server-express');

const app = express();
mongoDatabase.connect();

// See https://github.com/graphql/graphql-js/issues/1518
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () { // eslint-disable-line func-names
  return this.toString();
};


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

http.createServer(app);

const server = new ApolloServer({
  schema,
  playground: true,
  context: async ({ req, connection }) => {
    const authToken = connection ? connection.context.authToken : req.headers.authorization;
    console.log('new request: is ws? ', !!connection);
    if (connection) {
      console.log('context: ', JSON.stringify(connection.context, null, 2));
    }
    console.log('new request: auth token: ', authToken);
    return {
      authToken,
    };
  },
  subscriptions: {
    onConnect: (connectionParams /* webSocket */) => {
      const fromSsr = path(['fromServerSideRender'], connectionParams);
      console.log('new connection: from ssr:', fromSsr);
      const { authToken } = connectionParams;
      return {
        authToken,
      };
    },
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(config.port, () => {
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${config.port}${server.subscriptionsPath}`);
});
