// @flow
import * as React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import withRoot from 'lib/next/withRoot';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = (): void => NProgress.done();
Router.onRouteChangeError = (): void => NProgress.done();

type PropsType = {
  children: React.Element<any>,
  title?: string
};

const BaseLayout = ({
  children,
  title,
}: PropsType): React.Node => (
  <div className="root">
    <Typography component="div">
      <style global jsx>
        {`
          * {
            box-sizing: border-box;
          }
          html {
            height: 100%;
            font-size: 16px;
          }
          body {
            padding: 0;
            margin: 0;
            height: 100%;
          }
        `}
      </style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      {children}
    </Typography>
  </div>
);

BaseLayout.defaultProps = {
  title: 'Screen Manager',
};

export default withRoot(BaseLayout);
