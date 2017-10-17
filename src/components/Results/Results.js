import React, { Component } from 'react';
import { connect } from 'react-redux';

import CountUp from 'react-countup';

class Results extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div>
        <span> Results here </span>
        <br />
        <br />
        <CountUp start={0} end={ categories[0].value } />
        <br />
        <CountUp start={0} end={ categories[1].value } />
        <br />
        <CountUp start={0} end={ categories[2].value } />
        <br />
        <CountUp start={0} end={ categories[3].value } />
        <br />
        <CountUp start={0} end={ categories[4].value } />
        <br />
        <br />
        <button onClick={ () => this.props.history.push('/') }>Finish</button>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    categories: state.categories
  }
}

export default connect( mapStateToProps )( Results );