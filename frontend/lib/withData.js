import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import { InMemoryCache } from 'apollo-cache-inmemory';
import initApollo from './initApollo';

// Gets the display name of a JSX component for dev tools
function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export default ComposedComponent => class WithData extends React.Component {
  static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`

  static async getInitialProps(ctx) {
    let serverState = {};

    // Evaluate the composed component's getInitialProps()
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    if (!process.browser) {
      const cache = new InMemoryCache();

      const apollo = initApollo(cache, ctx);
      // Provide the `url` prop data in case a GraphQL query uses it
      const url = { query: ctx.query, pathname: ctx.pathname };

      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>);
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
      }
      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind();

      const state = apollo.extract();

      // No need to include other initial Redux state because when it
      // initialises on the client-side it'll create it again anyway
      serverState = state;
    }

    return {
      serverState,
      ...composedInitialProps,
    };
  }

  constructor(props) {
    super(props);
    const cache = new InMemoryCache().restore(this.props.serverState);
    this.apollo = initApollo(cache);
  }

  render() {
    return (
      <ApolloProvider client={this.apollo}>
        <ComposedComponent {...this.props} />
      </ApolloProvider>
    );
  }
};
