import React, { Component } from 'react';

export default class Start extends Component {
  render() {
    return (
      <div>
        <button onClick={ () => this.props.history.push('/question/0') }>Start Survey</button>
      </div>
    )
  }
}