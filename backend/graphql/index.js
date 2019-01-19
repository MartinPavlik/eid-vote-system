import { makeExecutableSchema } from 'graphql-tools';
import * as jwt from '../components/jwt';
import UserModel from '../models/user';
import PetitionModel from '../models/petition';
import PetitionVotesModel from '../models/petitionVote';

const secp256k1 = require('secp256k1');

const typeDefs = `
  type User {
    _id: ID!
    documentNumber: String!
    name: String
  }

  type Petition {
    _id: ID!
    title: String!
    description: String!
    to: String!
    from: String!
    owner: User!
    ownerId: ID!
    votes: [PetitionVote]
  }

  type PetitionVote {
    _id: ID!
    petitionId: ID!
    user: User!
    userId: ID!
    comment: String
  }

  input PetitionInput {
    title: String!
    description: String
    from: String!
    to: String!
  }

  input LoginMessageInput {
    documentNumber: String!
    publicKey: String!
    certificate: String!
  }

  input LoginInput {
    signature: String!
    message: LoginMessageInput!
  }

  type Query {
    petitions(_id: ID): [Petition]
  }

  type Mutation {
    createPetition(input: PetitionInput!): Petition
    login(input:LoginInput!): String
    vote(petitionId: ID, comment: String): Petition
  }
`;

const resolvers = {
  Query: {
    petitions: (_, { _id }) => {
      const filter = _id ? { _id } : {};
      return PetitionModel.find(filter).exec();
    },
  },

  Mutation: {
    vote: async (_, { petitionId, comment }) => {
      const userId = '5c43962cf7f529208f74cb40'; // todo
      const vote = { petitionId, userId, comment };
      const petitionVote = new PetitionVotesModel({ ...vote });
      await petitionVote.save();
      return PetitionModel.findById(petitionId);
    },
    createPetition: async (_, { input }) => {
      // TODO - inject owner id
      console.log('input: ', input); // eslint-disable-line
      const petition = new PetitionModel(input);

      console.log('petition: ', petition); // eslint-disable-line
      const newPetition = await petition.save();
      console.log('newPetition: ', newPetition); // eslint-disable-line

      return PetitionModel.findById(newPetition._id);
    },
    login: async (_, { input }) => {
      // TODO
      const {
        signature, message,
      } = input;

      const {
        publicKey,
        certificate,
        documentNumber,
      } = message;

      console.log('publicKey', publicKey);
      console.log('certificate', certificate);
      console.log('documentNumber', documentNumber);
      console.log('signature', signature);


      const messageAsString = JSON.stringify(message);

      console.log('message as string', messageAsString);

      const messageAsBuffer = Buffer.from(messageAsString);

      console.log('message as buffer', messageAsBuffer);


      // TODO - verify
      console.log(secp256k1.verify(messageAsBuffer, signature, publicKey));


      console.log('DONE');

      let user = await UserModel.findOne({ documentNumber }).exec();

      if (!user) {
        const newUser = new UserModel({ documentNumber });
        const newUserDoc = await newUser.save();
        user = await UserModel.findById(newUserDoc._id).exec();
      }

      const payload = { _id: user._id };
      return jwt.issue(payload);
    },
  },

  Petition: {
    owner: (petition) =>
      UserModel.findById(petition.ownerId),
    votes: (petition) =>
      PetitionVotesModel.find({ petitionId: petition.id }).exec(),
  },

  PetitionVote: {
    user: (petitionVote) =>
      UserModel.findById(petitionVote.userId),
  },
};


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
