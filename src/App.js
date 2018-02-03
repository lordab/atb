import React, { Component } from 'react';
import Login from './views/login/Login'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className='topnav'>
          <h2>ATB APP</h2>
        </div>
          <Login
            url="http://localhost:5000/api/users"
          />
      </div>
    );
  }
}

export default App;
