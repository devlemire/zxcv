import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculateModifiers } from '../../ducks/reducer';
import axios from 'axios';
import api from '../../utils/api';
import logo from '../../assets/logo.png';

import './Submit.css';

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
          this.setState({ error: 'Email address already used. Please use a different email.' });
        }
    });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="Submit__parent">
        <img className="logo" src={ logo } alt="company logo" />

        <div className="Submit__content">
          <p>Thanks for taking the time to complete our survey! Please enter in your email address below so we can stay in touch and submit your survey!</p>

          <div className="Submit__input-container">
            <input value={ this.state.email } onChange={ ( e ) => this.handleChange( e.target.value ) } />
            <button onClick={ this.submit }>Submit</button>
          </div>

          <div className="Submit__error-container">
            {
              error
              ?
                <span>{ error }</span>
              :
                null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { calculateModifiers } )( Submit );