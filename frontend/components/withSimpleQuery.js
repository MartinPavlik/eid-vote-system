import { graphql, withApollo, compose } from 'react-apollo';

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (EntityList)
export default (query, rootKey) =>
  compose(
    withApollo,
    graphql(query, {
      options: {
        variables: {},
      },
      props: ({ data }) => {
        return {
          data: {
            ...data,
            ...(rootKey ? { items: data[rootKey] } : {}),
          },
        };
      },
    }),
  );
