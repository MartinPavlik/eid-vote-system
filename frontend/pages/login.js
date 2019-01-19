import * as React from 'react';
import Layout from 'components/Layout';
import BaseLayout from 'components/BaseLayout';
import { pipe } from 'ramda';
import withData from 'lib/withData';
import Login from 'WebId/Login';


const LoginPage = () => (
  <BaseLayout title="Petitions">
    <Layout>
      <Login />
    </Layout>
  </BaseLayout>
);

export default pipe(
  withData,
)(LoginPage);
