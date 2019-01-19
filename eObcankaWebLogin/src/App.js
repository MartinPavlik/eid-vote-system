import React, { Component } from 'react';
import './App.css';
import WebID from './components/webId'
class App extends Component {

  constructor(props) {
    super(props);
    this.WebID = new WebID();
  }

  login = (e) => {
    this.WebID.login((err, message, signature) => {
      console.log(err);
      console.log(message);
      console.log(signature)
    });
  }

  getData = (e) => {
    this.WebID.getData((err, message, signature) => {
      console.log(err);
      console.log(message);
      console.log(signature)
    });
  }

  listenToStatusChange = (e) => {
    this.WebID.listenToStatusChange((status) => {
      // todo
      console.log(`card present: ${status} `);
    });
  }

  render() {
    this.listenToStatusChange();
    return (
      <div className="App">
        <button onClick={this.login}> LOGIN </button>
        <button onClick={this.getData}> GET DATA </button>

      </div>
    );
  }
}

export default App;
