import React, { Component } from 'react';
import './App.css';
import WebID from './components/webId'
class App extends Component {

  state = {
    isLoading: false,
    error: null,
    isCardPresent: false,
    isReaderPresent: false,
  }

  constructor(props) {
    super(props);
    this.WebID = new WebID();
  }

  componentDidMount() {
    this.WebID = new WebID();
    this.isReaderPresentListener();
    this.isCardPresentListener();
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
      this.setState({
        isReaderPresent: status
      });
    });
  }

  isReaderPresentListener = (e) => {
    this.WebID.isReaderPresentListener((status) => {
      this.setState({
        isCardPresent: status
      });
    });
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.login} disabled={!this.state.isReaderPresent || !this.state.isCardPresent}> LOGIN </button>
        <button onClick={this.register} disabled={!this.state.isReaderPresent || !this.state.isCardPresent}> REGISTER </button>
        <button onClick={this.sign} disabled={!this.state.isReaderPresent || !this.state.isCardPresent}> SIGN </button>
      </div>
    );
  }
}

export default App;
