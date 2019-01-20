import * as React from 'react';
import Layout from 'components/Layout';
import BaseLayout from 'components/BaseLayout';
import { pipe } from 'ramda';
import withData from 'lib/withData';
import { removeToken } from 'Auth';
import redirect from 'lib/redirect';

class LogoutPage extends React.Component {
  componentWillMount() {
    if (process.browser) {
      removeToken();
      redirect('/login');
    }
  }

  render = () => {
    return (
      <BaseLayout title="Logout">
        <Layout>
          Odhlašuji Vás...
        </Layout>
      </BaseLayout>
    );
  };
}

export default pipe(
  withData,
)(LogoutPage);
