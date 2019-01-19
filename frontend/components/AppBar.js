// @flow
import * as React from 'react';
// import UserIcon from 'User/UserIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return {
    base: {
      display: 'flex',
      flex: 1,
      background: theme.palette.appBar.main,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 4}px`,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  };
};

const AppBar = ({ classes }): React.Node => (
  <div className={classes.base}>
    TODO
  </div>
);

export default withStyles(styles)(AppBar);
