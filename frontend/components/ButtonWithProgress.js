// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';


type PropsType = {
  isLoading: ?boolean,
  error: ?any,
  children: ?(React.Node | string),
  classes: {
    icon: string
  }
};

const ButtonWithProgress = ({
  isLoading, classes, children, error, ...otherProps
}: PropsType): React.Node => (
  <Button
    disabled={isLoading || error}
    {...otherProps}
  >
    {isLoading &&
      <CircularProgress
        size={24}
        className={classes.icon}
      />
    }
    {error || children}
  </Button>
);

/* eslint-disable */
const styles = theme => ({
  icon: {
    color: green[500],
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(ButtonWithProgress);