import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const currentUserIdQuery = gql`
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
    fetchPolicy: 'network-only',
  },
);

export default withCurrentUserId;
