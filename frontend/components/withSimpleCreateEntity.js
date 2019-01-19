
import { graphql, withApollo, compose } from 'react-apollo';
import { createOptimisticId } from 'lib/apolloHelpers';

export default (mutation, rootKey, updateConfig, propsCallbackKey = 'onCreate') =>
  compose(
    withApollo,
    graphql(mutation, {
      props: ({ mutate }) => ({
        [propsCallbackKey]: input => mutate({
          variables: { input },
          optimisticResponse: {
            __typename: 'Mutation',
            [rootKey]: {
              __typename: 'Scene',
              ...input,
              sceneItems: [],
              _id: createOptimisticId(),
            },
          },
          update: (proxy, { data }) => {
            if (!updateConfig.query || !updateConfig.rootKey) {
              console.warn('No query or root key provided');
              return;
            }

            console.info('data:', data, updateConfig);

            const newItem = data[rootKey];

            console.info('new item', newItem);

            // Read the data from our cache for this query.
            const queryData = proxy.readQuery({ query: updateConfig.query });
            console.info('query data', queryData);
            // Add our todo from the mutation to the end.
            queryData[updateConfig.rootKey].push(newItem);

            // Write our data back to the cache.
            proxy.writeQuery({ query: updateConfig.query, data: queryData });
          },
        }),
      }),
    }),
  );

