import React, { Component } from 'react';

import api from '../../utils/api';

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
        <input onChange={ ( e ) => this.handleChange( e.target.value ) } />
        <a href={ `${ api.base + api.emails }?password=${ this.state.password }`} 
           download="emails.csv">
          Download Emails
        </a>
      </div>
    );
  }
}