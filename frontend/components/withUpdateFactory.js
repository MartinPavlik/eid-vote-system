import { graphql, withApollo, compose } from 'react-apollo';

export const withUpdateFactory = ({
  // String
  propName = 'onUpdate',
  // gqlTag
  mutation,
  // String
  mutationName,
  // [{ queryDefinition: gqlTag, queryName: String }]
  relatedQueries = [],
  // (object, id) -> object
  createOptimisticUpdate,
}) => compose(
  withApollo,
  graphql(mutation, {
    props: (props) => {
      const { mutate, ownProps: { onCompleted, client } } = props;
      return {
        [propName]: (input, id) =>
          new Promise(resolve => {
            const optimisticResponse =
              createOptimisticUpdate ?
                {
                  __typename: 'Mutation',
                  [mutationName]: createOptimisticUpdate(input, id, client),
                } : undefined;

            mutate({
              variables: { input, id },
              optimisticResponse,
              update: (proxy, { data }) => {
                const result = data[mutationName];
                if (onCompleted) {
                  onCompleted(result);
                }

                // Creating new item?
                if (!id) {
                  relatedQueries.forEach(({ query, queryName }) => {
                    const queryData = proxy.readQuery({ query });
                    queryData[queryName].push(result);
                    proxy.writeQuery({ query, data: queryData });
                  });
                }

                return resolve(result);
              },
            });
          }),
      };
    },
  }),
);

export default withUpdateFactory;
