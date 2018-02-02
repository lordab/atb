import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './views/login/Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class='topnav'>
          <h2>ATB APP</h2>
        </div>
        <p className="App-intro">
          <Login />
        </p>
      </div>
    );
  }
}

export default App;
