import React, { Component } from 'react';
import './App.css';

import router from '../router';

class App extends Component {
  render() {
    return (
      <div className="App__parent">
        <div className="App__child">
          { router }
        </div>
      </div>
    );
  }
}

export default App;
