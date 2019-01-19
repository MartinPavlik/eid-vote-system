/* eslint-disable */
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import flush from 'styled-jsx/server';
import getPageContext from 'lib/next/getPageContext';
import htmlescape from 'htmlescape';

import jss from 'jss';
import jssNestedPlugin from 'jss-nested';

jss.use(jssNestedPlugin());

// Pick properties that should be in window._ENV_
// be careful what is there since can be easily read
// in the browser...
const {
  WEBSOCKET_URL,
  SERVER_URL,
  GRAPHQL_URL,
  GRAPHQL_URL_WS,
  FILES_URL,
  MODE,
  LOGIN_COVER_PHOTO,
  PORT,
} = process.env;

const env = {
  WEBSOCKET_URL,
  SERVER_URL,
  GRAPHQL_URL,
  GRAPHQL_URL_WS,
  FILES_URL,
  MODE,
  LOGIN_COVER_PHOTO,
  PORT,
};

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>My page</title>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <script
            dangerouslySetInnerHTML={
              { __html: `__ENV__ = ${htmlescape(env)}` }
            }
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link 
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects


  const pageContext = getPageContext();

  const page = ctx.renderPage(Component => props => {
    return <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
      {/* <Component pageContext={pageContext} {...props} /> */}
    </JssProvider>
  });

  return {
    ...page,
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
