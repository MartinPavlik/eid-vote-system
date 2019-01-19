import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import redirect from 'lib/redirect';
import { setToken } from 'Auth';
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
    const { onLogin } = this.props;
    this.setState({ error: null, isLoading: true });
    this.WebID.login((error, message, signature) => {
      console.log('login: error', error);
      console.log('login: message', message);
      console.log('login: signature', signature);
      /*
      if (error) {
        this.setState({
          error: error.message,
          isLoading: false,
        });
      } else {
        // TODO
      }

      const { documentNumber, shortCert, publicKey } = message;
      */

      const fakeMessage = {
        documentNumber: 'fake doc num',
        certificate: 'fake cert',
        publicKey: 'fake pub key',
      };

      const fakeSignature = 'fake sign';

      onLogin({
        message: fakeMessage,
        signature: fakeSignature,
      }).then(token => {
        console.log('token::', token);
        setToken(token);
        redirect('/');
      }).catch(e => {
        console.log('Error: ', e);
        this.setState({
          error: 'Can not log in',
          isLoading: false,
        });
      });
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
    this.WebID.isCardPresentListener((status) => {
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

const loginMutation = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

const withLogin = graphql(
  loginMutation,
  {
    props: ({ mutate }) => ({
      onLogin: (input) => mutate({
        variables: {
          input,
        },
      }).then(({ data: { login } }) => login),
    }),
  },
);

export default withLogin(Login);
