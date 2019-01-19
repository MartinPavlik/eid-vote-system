import { makeExecutableSchema } from 'graphql-tools';
import UserModel from '../models/user';
import PetitionModel from '../models/petition';

const secp256k1 = require('secp256k1');

// const eccrypto = require('eccrypto');

const typeDefs = `
  type User {
    _id: ID!
    cardId: String!
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
  }
`;

const resolvers = {
  Query: {
    petitions: (_, { _id }) => (_id ?
      PetitionModel.findById(_id) :
      PetitionModel.find({}).exec()
    ),
  },

  Mutation: {
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

      console.log(secp256k1.verify(message, signature, publicKey));

      // console.log('verified: ', verified);
      // TOOD - generate JWT token here and return it
      return '';
    },
  },

  Petition: {
    owner: (petition) =>
      UserModel.findById(petition.ownerId),
  },
};


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
