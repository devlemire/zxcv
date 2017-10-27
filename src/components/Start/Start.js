import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { connect } from 'react-redux';
import { reset } from '../../ducks/reducer';

import './Start.css';

class Start extends Component {
  componentDidMount() {
    const { reset } = this.props;

    let appChildStyles = document.getElementById('App__child').style;
    appChildStyles.width = '976px';

    reset();
  }

  componentDidUpdate() {
    const { reset } = this.props;
    reset();
  }

  render() {
    return (
      <div className="Start__parent">
        <Link to="/admin">
          <button className="Start__adminLink">Admin Tools</button>
        </Link>
        <img className="logo" src={ logo } alt="company logo" />

        <div className="Start__content">
          <h1>Student Survey</h1>
          <p>The world of new and emerging technologies is changing every day. Take ten minutes to fill out a short questionnaire and you could find out which tech job could be right for you. As you fill out each question,  remember that there are no wrong answers, just try to be honest with yourself.</p>

          <div className="Start__btnContainer">
            <button onClick={ () => this.props.history.push('/question/0') }>Start the Survey!</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect( state => state, { reset } )( Start );

Start.propTypes = {
  history: PropTypes.object.isRequired
}