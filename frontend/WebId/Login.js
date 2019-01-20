/* eslint-disable */

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
    isCardPresent: false,
    isReaderPresent: false,
  }

  componentDidMount() {
    if (process.browser) {
      this.WebID = new WebID();
      this.handleListenToStatusChange();
    }
  }

  handleSign = () => {
    this.WebID.sign((err, loginData) => {
      console.log(err);
      console.log(loginData);
    });
  }

  handleLogin = () => {
    const { onLogin } = this.props;
    this.setState({ error: null, isLoading: true });

    this.WebID.login((err, loginData) => {
      console.log(err, loginData);
      const message = {
        documentNumber: loginData.signData.documentNumber,
        certificate: loginData.signData.shortCertBase64,
        // certificate: loginData.signData.publicKeyBase64,
        // certificate: '5938374',
        publicKey: loginData.signData.publicKeyBase64,
      };
      onLogin({
        message,
        signature: loginData.signature || 'fake',
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
  }

  handleListenToStatusChange = () => {
    this.WebID.isCardPresentListener((status) => {
      this.setState({ isCardPresent: status });
      // todo
    });
    this.WebID.isReaderPresentListener((status) => {
      this.setState({ isReaderPresent: status });
      // todo
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
      <div style={{ textAlign: 'center' }}>
        {isLoading ?
          <Typography component="p">
            Loading...
          </Typography>
          :
          <div>
              {!this.state.isReaderPresent &&
                <Typography variant="display1">
                  Prosím, vložte čtečku karet
                </Typography>
              }
              {!this.state.isCardPresent &&
                <Typography variant="display1">                  Prosím, vložte kartu
                </Typography>
              }
            <Button
              style={{ marginTop: '2rem' }}
              onClick={this.handleLogin}
              disabled={!this.state.isCardPresent || !this.state.isReaderPresent}
            >
            Login
            </Button>
          </div>
        }
        {/*
        <Button
          onClick={this.handleSign}
          disabled={!this.state.isCardPresent || !this.state.isReaderPresent}
        >Sign
        </Button>
        */}
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