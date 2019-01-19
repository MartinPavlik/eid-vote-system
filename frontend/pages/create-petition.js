import * as React from 'react';
import Layout from 'components/Layout';
import BaseLayout from 'components/BaseLayout';
import { pipe } from 'ramda';
import withData from 'lib/withData';
import CreatePage from 'Petition/CreatePage';


const CreatePetitionPage = () => (
  <BaseLayout title="Create Petition">
    <Layout>
      <CreatePage />
    </Layout>
  </BaseLayout>
);

export default pipe(
  withData,
)(CreatePetitionPage);
