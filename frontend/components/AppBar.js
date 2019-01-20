// @flow
import * as React from 'react';
// import UserIcon from 'User/UserIcon';
import { pipe } from 'ramda';
import Link from 'components/Link';
import { withStyles } from '@material-ui/core/styles';
import withCurrentUserId from 'Auth/withCurrentUserId';

const styles = theme => {
  return {
    base: {
      display: 'flex',
      flex: 1,
      // background: theme.palette.appBar.main,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 4}px`,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  };
};

const AppBar = ({ classes, currentUserId }): React.Node => (
  <div className={classes.base}>
    {currentUserId &&
      <Link href="/create-petition" style={{ color: 'white' }}>Vytvořit petici</Link>
    }
    <Link href="/login" style={{ color: 'white' }}>Login</Link>
  </div>
);

export default pipe(
  withStyles(styles),
  withCurrentUserId,
)(AppBar);
