import React, { Component } from 'react';

export default class Navigation extends Component {
  render() {
    const { history, lastQuestion, currentQuestion } = this.props;
    console.log( currentQuestion, lastQuestion );

    return (
      <div>
        {
          currentQuestion === 0
          ?
            null
          :
            <button onClick={ () => history.push(`/question/${ currentQuestion - 1 }`) }>Previous Question</button>
        }
        {
          currentQuestion === lastQuestion
          ?
            <button onClick={ () => history.push('/submit') }>Submit Survey</button>
          :
            <button onClick={ () => history.push(`/question/${ currentQuestion + 1 }`) }>Next Question</button>
        }
      </div>
    )
  }
}