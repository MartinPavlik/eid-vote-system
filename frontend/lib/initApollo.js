import ApolloClient from 'apollo-client';
import { from } from 'apollo-link';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { GRAPHQL_URL_WS } from 'appConfig';
import { getToken } from 'Auth';
import ws from 'ws';

let apolloClient = null;

export default function initApollo(cache, context) {
  const transportClient = new SubscriptionClient(
    GRAPHQL_URL_WS, {
      reconnect: process.browser,
      connectionParams: () => ({
        authToken: `Bearer ${getToken(context)}`,
      }),
    },
    process.browser ? WebSocket : ws,
  );

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
