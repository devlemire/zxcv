import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculateModifiers } from '../../ducks/reducer';
import CountUp from 'react-countup';

import calcModifiers from '../../utils/calcModifiers';

class Results extends Component {
  componentDidMount() {
    const { answers, calculateModifiers } = this.props;
    if ( answers.length > 0 ) {
      const modifiers = calcModifiers( answers );
      calculateModifiers(modifiers);
      console.log( modifiers );
    }
  }

  render() {
    return (
      <div>
        <span> Results here </span>
        <br />
        <br />
        <CountUp start={0} end={30} />
        <br />
        <CountUp start={0} end={30} />
        <br />
        <CountUp start={0} end={30} />
        <br />
        <CountUp start={0} end={30} />
        <br />
        <CountUp start={0} end={30} />
      </div>
    )
  }
}

export default connect( state => state, { calculateModifiers } )( Results );