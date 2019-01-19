import React, { Component } from 'react';
import WebID from './';

class App extends Component {

  componentDidMount() {
    if (process.browser) {
      this.WebID = new WebID();
      this.handleListenToStatusChange();
    }
  }

  handleLogin = () => {
    this.WebID.login((err, message, signature) => {
      console.log('login: error', err);
      console.log('login: message', message);
      console.log('login: signature', signature);
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
    return (
      <div className="App">
        <button onClick={this.handleLogin}> LOGIN </button>
        <button onClick={this.handleGetData}> GET DATA </button>
      </div>
    );
  }
}

export default App;
