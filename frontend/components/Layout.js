// @flow
import * as React from 'react';
import grey from '@material-ui/core/colors/grey';
import AppBar from './AppBar';
import Menu from './Menu';

type PropsType = {
  children: React.Element<any>
};

const Layout = ({
  children,
}: PropsType): React.Node => (
  <React.Fragment>
    <style jsx>{
      `
        /*
          TODO - do not set sany overflow rules here,
          otherwise children that are using 'position: sticky' can be fucked up.
        */
        .container {
          display: grid;
          grid-template-columns: 200px auto;
          grid-template-areas:
            'sidebar topbar'
            'sidebar wrapper';
          grid-template-rows: 60px auto;
          background: #f0f0f0;
          grid-gap: 0;
        }

        .sidebar {
          grid-area: sidebar;
          width: 200px;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          display: grid;
          grid-template-areas:
            'logo'
            'menu';
          grid-template-rows: 60px auto;
          -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0 ,0.1);
          -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0 ,0.1);
          box-shadow: 0px 0px 20px 0px rgba(0, 0, 0 ,0.1);
        }

        .logo {
          font-size: 125%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          padding: 0 0.4rem;
        }

        .logo-image {
          width: 100%;
        }

        .topbar {
          grid-area: topbar;
          display: flex;
        }

        .wrapper {
          grid-area: wrapper;
          background: ${grey[100]};
          display: flex;
        }

        .menu {
          grid-area: menu;
          background: white;
        }

        .content {
          padding: 2rem;
          flex-grow: 1;
        }
      `
    }
    </style>
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <img src="/static/logo.png" className="logo-image" alt="Screen Manager" />
        </div>

        <div className="menu">
          <Menu />
        </div>

      </div>

      <div className="topbar">
        <AppBar />
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
