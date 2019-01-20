import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const currentUserIdQuery = gql`
  query currentUserId {
    currentUserId
  }
`;

const withCurrentUserId = graphql(
  currentUserIdQuery,
  {
    props: ({ data: { currentUserId } }) => ({
      currentUserId,
    }),
  },
);

export default withCurrentUserId;
