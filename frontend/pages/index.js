import * as React from 'react';
import Layout from 'components/Layout';
import BaseLayout from 'components/BaseLayout';
import { pipe } from 'ramda';
import withData from 'lib/withData';
import Home from 'Home/HomePage';


const HomePage = () => (
  <BaseLayout title="Petitions">
    <Layout>
      <Home />
    </Layout>
  </BaseLayout>
);

export default pipe(
  withData,
)(HomePage);
