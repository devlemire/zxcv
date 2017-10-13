import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculateModifiers } from '../../ducks/reducer';

import axios from 'axios';
import api from '../../utils/api';

class Submit extends Component {
  componentDidMount() {
    const { answers, calculateModifiers } = this.props;
    if ( answers.length > 0 ) {
      calculateModifiers( answers );
    }
  }

  constructor() {
    super();
    this.state = {
      email: '',
      error: null
    };

    this.handleChange = this.handleChange.bind( this );
    this.submit = this.submit.bind( this );
  }

  handleChange( value ) {
    this.setState({ email: value });
  }

  submit() {
    const { email } = this.state;
    const { history, categories } = this.props;

    if ( email === '' ) return;

    let requestBody = { email };
    for( var i = 0; i < categories.length; i++) {
      requestBody[ categories[i].label ] = categories[i].value;
    }

    axios.post( `${api.base + api.submissions}`, requestBody )
      .then( () => history.push('/results') )
      .catch( err => {
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
        <button onClick={ this.submit }>Submit</button>
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

export default connect( state => state, { calculateModifiers } )( Submit );