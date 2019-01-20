import * as React from 'react';
import Layout from 'components/Layout';
import BaseLayout from 'components/BaseLayout';
import { pipe } from 'ramda';
import withData from 'lib/withData';
import DetailPage from 'Petition/DetailPage';


const PetitionDetailPage = (props) => (
  <BaseLayout title="Petition detail">
    <Layout>
      <DetailPage petitionId={props.url.query.petitionId} />
    </Layout>
  </BaseLayout>
);

export default pipe(
  withData,
)(PetitionDetailPage);
