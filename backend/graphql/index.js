import { makeExecutableSchema } from 'graphql-tools';
import * as jwt from '../components/jwt';
import UserModel from '../models/user';
import PetitionModel from '../models/petition';
import PetitionVotesModel from '../models/petitionVote';
import withAuth from './withAuth';

// const secp256k1 = require('secp256k1');

const typeDefs = `
  type User {
    _id: ID!
    documentNumber: String!
    name: String
    sex: String
  }

  type Petition {
    _id: ID!
    title: String!
    description: String!
    to: String!
    from: String!
    userHasAlreadyVoted: Boolean!
    owner: User!
    ownerId: ID!
    votes: [PetitionVote]
  }

  type PetitionVote {
    _id: ID!
    petitionId: ID!
    age: Int
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
    currentUserId: ID
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
    currentUserId: withAuth(false)(async (_, __, { user }) =>
      user._id,
    ),
  },

  Mutation: {
    vote: withAuth(true)(async (_, { petitionId, comment }, { user }) => {

      // todo select birthDate and sex, and validate if user already vote
      const selectedUser = await UserModel.findById(user._id);

      const userId = selectedUser._id;
      const age = Math.round((Math.random() * 100));
      const sex = 'M';

      const vote = {
        petitionId, userId, comment, age, sex,
      };
      const petitionVote = new PetitionVotesModel({ ...vote });
      await petitionVote.save();
      return PetitionModel.findById(petitionId);
    }),
    createPetition: withAuth(true)(async (_, { input }, { user }) => {
      const petition = new PetitionModel({ ...input, ownerId: user._id });
      const newPetition = await petition.save();
      return PetitionModel.findById(newPetition._id);
    }),
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
      // console.log(secp256k1.verify(messageAsBuffer, signature, publicKey));


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
    // TODO
    userHasAlreadyVoted: withAuth(false)(async (petition, _, { user }) => {
      if (!user) {
        return false;
      }
      const maybeVote = await PetitionVotesModel.findOne({ userId: user._id }).exec();
      return Boolean(maybeVote);
    }),
    owner: (petition) =>
      UserModel.findById(petition.ownerId),
    votes: (petition) =>
      PetitionVotesModel.find({ petitionId: petition._id }).exec(),
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
