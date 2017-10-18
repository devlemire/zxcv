import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

import './Start.css';

export default class Start extends Component {
  componentDidMount() {
    let appChildStyles = document.getElementById('App__child').style;
    appChildStyles.width = '976px';
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
          <p>
            Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          </p>

          <div className="Start__btnContainer">
            <button onClick={ () => this.props.history.push('/question/0') }>Start the Survey!</button>
          </div>
        </div>
      </div>
    )
  }
}