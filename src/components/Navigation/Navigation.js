import React, { Component } from 'react';

import questions from '../../utils/questions.json';
import completed from '../../assets/completed.png';
import incompleted from '../../assets/incompleted.png';
import current from '../../assets/current.png';

import './Navigation.css';

export default class Navigation extends Component {
  render() {
    const { history, lastQuestion, currentQuestion } = this.props;
    
    return (
      <div className="Navigation__parent">
        {
          currentQuestion === 0
          ?
            null
          :
            <button className="Navigation__btn-left"
                    onClick={ () => history.push(`/question/${ currentQuestion - 1 }`) }>
              Previous Question
            </button>
        }
        {
          currentQuestion === lastQuestion
          ?
            <button className="Navigation__btn-right" 
                    onClick={ () => history.push('/submit') }>
              Submit Survey
            </button>
          :
            <button className="Navigation__btn-right"
                    onClick={ () => history.push(`/question/${ currentQuestion + 1 }`) }>
              Next Question
            </button>
        }

        <div className="Navigation__questionCount">
          {
            questions.map( ( question, i ) => (
              <img className="Navigation__questionImg"
                   key={ `question-img-${ i }` }
                   src={ i === currentQuestion ? current : i > currentQuestion ? incompleted : completed }
                   alt=""
              />
            ))
          }
        </div>
      </div>
    )
  }
}