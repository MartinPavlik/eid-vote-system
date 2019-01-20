import React, { Component } from 'react';
import './App.css';
import WebID from './components/webId'
class App extends Component {

  constructor(props) {
    super(props);
    this.WebID = new WebID();
  }

  register = async (e) => {
    const data = await this.WebID.register();
    console.log(data);
  }

  login = async (e) => {
    const data = await this.WebID.login();
    console.log(data);
  }

  sign = async (e) => {
    const data = await this.WebID.sign();
    console.log(data);
  }

  isCardPresentListener = (e) => {
    this.WebID.isCardPresentListener((status) => {
      console.log(`card present: ${status} `);
    });
  }

  render() {
    this.isCardPresentListener();
    return (
      <div className="App">
        <button onClick={this.login}> LOGIN </button>
        <button onClick={this.register}> REGISTER </button>
        <button onClick={this.sign}> SIGN </button>
      </div>
    );
  }
}

export default App;
