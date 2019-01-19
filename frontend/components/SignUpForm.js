import React from 'react';
import PropTypes from 'prop-types';
import fNoop from 'lodash/fp/noop';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const LoginForm = ({
  classes, onFieldChange, onSubmit, email, password,
}) => (
  <React.Fragment>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={onSubmit}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              onChange={e => onFieldChange('email', e.target.value)}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={e => onFieldChange('password', e.target.value)}
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
            />
          </FormControl>
          {/*
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
              Sign up
          </Button>
        </form>
      </Paper>
    </main>
  </React.Fragment>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onFieldChange: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
};

LoginForm.defaultProps = {
  onSubmit: fNoop,
  onFieldChange: fNoop,
  email: '',
  password: '',
};

export default withStyles(styles)(LoginForm);
