import React, { Component } from 'react';

import axios from 'axios';
import api from '../../utils/api';

export default class SubmitEmail extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: null
    };

    this.handleChange = this.handleChange.bind( this );
    this.submitEmail = this.submitEmail.bind( this );
  }

  handleChange( value ) {
    this.setState({ email: value });
  }

  submitEmail() {
    const { email } = this.state;
    const { history } = this.props;

    axios.post( `${api.base + api.emails}?email=${ email }` ).then( r => {
      history.push('/results');
    }).catch( err => {
      // Unparse the error.
      const errObj = Object.assign({}, err);
      const errMsg = errObj.response.data;

      // Email Address has already been submitted
      if ( errMsg.code === '23505' ) {
        this.setState({ error: 'Email address already used.' });
      }
    });
  }

  render() {
    const { error } = this.state;

    return (
      <div>
        Submit Email
        <input value={ this.state.email } onChange={ ( e ) => this.handleChange( e.target.value ) } />
        <button onClick={ this.submitEmail }>Submit</button>
        <br />
        <br />
        {
          error
          ?
            <span>{ error }</span>
          :
            null
        }
      </div>
    )
  }
}