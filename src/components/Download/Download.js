import React, { Component } from 'react';
import api from '../../utils/api';

import './Download.css';
import logo from '../../assets/logo.png';

export default class Download extends Component {
  constructor() {
    super();
    this.state = {
      password: ''
    };

    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( value ) {
    this.setState({ password: value });
  }

  render() {
    return (
      <div className="Download__parent">
        <img className="logo" src={ logo } alt="company logo" />
        <input onChange={ ( e ) => this.handleChange( e.target.value ) } 
                placeholder="Password"
                className="Download__password" /> 

        <a className="Download__link" 
           href={ `${ api.base + api.submissions }?password=${ this.state.password }` }
           download="submissions.csv" >
          Download Submissions
        </a>
      </div>
    );
  }
}