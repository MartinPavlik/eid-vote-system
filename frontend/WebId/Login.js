import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WebID from './';

class Login extends Component {
  state = {
    isLoading: false,
    error: null,
  }

  componentDidMount() {
    if (process.browser) {
      this.WebID = new WebID();
      this.handleListenToStatusChange();
    }
  }

  handleLogin = () => {
    this.setState({ error: null, isLoading: true });
    this.WebID.login((error, message, signature) => {
      console.log('login: error', error);
      console.log('login: message', message);
      console.log('login: signature', signature);
      if (error) {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      } else {
        // TODO
      }
    });
  }

  handleGetData = () => {
    this.WebID.getData((err, message, signature) => {
      console.log('error', err);
      console.log('messsage', message);
      console.log('signature', signature);
    });
  }

  handleListenToStatusChange = () => {
    this.WebID.listenToStatusChange((status) => {
      // todo
      console.log(`card present: ${status} `);
    });
  }

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return (
        <Typography component="p">
          Can not login because: {error}
        </Typography>
      );
    }
    return (
      <div>
        {isLoading ?
          <Typography component="p">
            Loading...
          </Typography>
          :
          <Button onClick={this.handleLogin}>Login</Button>
        }
      </div>
    );
  }
}

export default Login;
