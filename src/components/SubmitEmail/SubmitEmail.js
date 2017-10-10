import React, { Component } from 'react';

export default class SubmitEmail extends Component {
  render() {
    return (
      <div>
        Submit Email
        <input />
        <button onClick={ () => this.props.history.push('/results') }>Submit</button>
      </div>
    )
  }
}