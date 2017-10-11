import React, { Component } from 'react';
import './App.css';

import router from '../router';
import Download from './Download/Download';

class App extends Component {
  render() {
    return (
      <div className="App">
        Most Parent Component Here
        <br />
        <Download />
        { router }
      </div>
    );
  }
}

export default App;
