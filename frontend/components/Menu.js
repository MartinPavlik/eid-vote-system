import * as React from 'react';
import grey from '@material-ui/core/colors/grey';
import fFlow from 'lodash/fp/flow';
import Icon from '@material-ui/core/Icon';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import Link from './Link';

const links = [
  {
    url: '/',
    text: 'Home',
    icon: 'home',
  },
];

const Menu = ({ theme }) => (
  <nav className="nav">
    {
      links.map((link) => (
        <Link
          activeClassName="active"
          className="link"
          alternativeExactPaths={link.alternativeExactPaths}
          href={link.url}
          key={`${link.url}x`}
        >
          <Icon className="link-icon">{link.icon}</Icon>
          <Typography>{link.text}</Typography>
        </Link>
      ))
    }
    <style jsx global>
      {`
        nav.nav {
          margin: 0;
        }
        .link {
          width: 100%;
          display: block;
          text-decoration: none;
          padding: 1rem;
          display: flex;
          justify-items: center;
          align-items: center;
          color: ${grey[600]}
        }

        .link-content {
          width: 100%;
        }

        .link:hover {
          background: ${grey[200]};
        }

        .link.active {
          color: ${theme.palette.primary.main} !important;
        }

        .link-icon {
          margin: 0 1rem;
        }
      `}
    </style>
  </nav>
);

export default fFlow(
  withRouter,
  withTheme(),
)(Menu);
