// @flow
import * as React from 'react';
import grey from '@material-ui/core/colors/grey';
import AppBar from './AppBar';

const Layout = ({
  children,
}) => (
  <React.Fragment>
    <style jsx>{
      `
        .container {
          display: grid;
          grid-template-columns: auto;
          grid-template-areas:
            'topbar'
            'wrapper';
          grid-template-rows: 60px auto;
          background: #f0f0f0;
          grid-gap: 0;
        }

        .topbar {
          grid-area: topbar;
          display: flex;
          background: #2b3d51;
        }

        .wrapper {
          grid-area: wrapper;
          background: ${grey[100]};
          display: flex;
        }

        .content {
          padding: 2rem;
          width: 70%;
          margin: 0 auto;
        }
      `
    }
    </style>
    <div className="container">
      <div className="topbar">
        <div className="content">
          <AppBar />
        </div>
      </div>

      <div className="wrapper">
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>
);

Layout.defaultProps = {
};

export default Layout;
