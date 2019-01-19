import ApolloClient from 'apollo-client';
import { from } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { GRAPHQL_URL_WS } from 'appConfig';
// import { getToken } from 'Auth';
import semver from 'semver';
import gql from 'graphql-tag';
import ws from 'ws';
import { version } from '../package.json';

// TODO
const getToken = () => '';

let apolloClient = null;

const setupVersionWatcher = () => {
  if (apolloClient) {
    apolloClient.query({
      // Never use result from the cache
      fetchPolicy: 'network-only',
      query:
        gql`query CurrentVersion {
          CurrentVersion {
            frontendVersion
            backendVersion
            _id
          }
        }`,
    }).then(({ data: { CurrentVersion } }) => {
      console.log('Version check done: ', CurrentVersion);
      if (semver.lt(version, CurrentVersion.frontendVersion)) {
        console.log('Reloading to version: ', CurrentVersion.frontendVersion);
        document.location.reload(true);
      }
    });
  }
};

export default function initApollo(cache, context) {
  const transportClient = new SubscriptionClient(
    GRAPHQL_URL_WS, {
      reconnect: process.browser,
      connectionParams: () => ({
        authToken: `Bearer ${getToken(context)}`,
        fromServerSideRender: Boolean(process.browser),
      }),
    },
    process.browser ? WebSocket : ws,
  );


  if (process.browser) {
    transportClient.onConnected(setupVersionWatcher);
    transportClient.onReconnected(setupVersionWatcher);
  }

  const wsLink = new WebSocketLink(transportClient);

  function create() {
    const client = new ApolloClient({
      link: from([
        wsLink,
      ]),
      cache,
    });
    return client;
  }


  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create();
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create();
  }

  return apolloClient;
}
