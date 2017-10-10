import React, { Component } from 'react';
import axios from 'axios';

export default class Download extends Component {
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
      <div className="Download">
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