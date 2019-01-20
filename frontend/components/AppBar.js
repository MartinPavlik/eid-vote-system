// @flow
import * as React from 'react';
// import UserIcon from 'User/UserIcon';
import { pipe } from 'ramda';
import Link from 'components/Link';
import { withStyles } from '@material-ui/core/styles';
import withCurrentUserId from 'Auth/withCurrentUserId';
import Button from '@material-ui/core/Button';


const styles = theme => {
  return {
    base: {
      display: 'flex',
      flex: 1,
      height: '100%',
      // background: theme.palette.appBar.main,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 4}px`,
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
    },
  };
};

const AppBar = ({ classes, currentUserId }): React.Node => (
  <div className={classes.base}>

    <span>
      <Link className={classes.link} href="/" style={{ color: 'white' }}><img height={60} style={{ verticalAlign: 'bottom' }} src="/static/logo-panel.png" /></Link>
    </span>

    <Button color="primary">
      <Link className={classes.link} href="/petitions" style={{ color: 'white' }}>Petice</Link>
    </Button>

    {currentUserId &&
      <Button color="primary">
        <Link className={classes.link} href="/create-petition" style={{ color: 'white' }}>Vytvořit petici</Link>
      </Button>
    }

    {!currentUserId &&
      <Button color="primary" style={{ marginLeft: 'auto' }}>
        <Link className={classes.link} href="/login" style={{ color: 'white' }}>Login</Link>
      </Button>
    }

  </div>
);

export default pipe(
  withStyles(styles),
  withCurrentUserId,
)(AppBar);
