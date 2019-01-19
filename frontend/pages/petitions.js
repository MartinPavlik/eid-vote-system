import * as React from 'react';
import Layout from 'components/Layout';
import BaseLayout from 'components/BaseLayout';
import { pipe } from 'ramda';
import withData from 'lib/withData';
import ListPage from 'Petition/ListPage';


const PetitionListPage = () => (
  <BaseLayout title="Petition detail">
    <Layout>
      <ListPage />
    </Layout>
  </BaseLayout>
);

export default pipe(
  withData,
)(PetitionListPage);
