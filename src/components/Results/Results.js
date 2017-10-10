import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculateModifiers } from '../../ducks/reducer';

import calcModifiers from '../../utils/calcModifiers';

class Results extends Component {
  componentDidMount() {
    const { answers, calculateModifiers } = this.props;
    const modifiers = calcModifiers( answers || [] );
    calculateModifiers(modifiers);
    console.log( modifiers );
  }

  render() {
    return (
      <div>
        <span> Results here </span>
      </div>
    )
  }
}

export default connect( state => state, { calculateModifiers } )( Results );