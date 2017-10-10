import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      csv: null,
      password: ''
    };

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( value ) {
    this.setState({ password: value });
  }

  render() {
    return (
      <div className="App">
        Hello
        <input onChange={ ( e ) => this.handleChange( e.target.value ) } />
        <a href={`http://localhost:3000/api/emails?password=${ this.state.password }`} 
           download="emails.csv">
          Download Emails
        </a>
      </div>
    );
  }
}

export default App;
