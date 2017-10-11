import React, { Component } from 'react';

export default class Multiple extends Component {
  updateAnswers( checked, currentQuestion, optionIndex ) {
    const { select, currentAnswers } = this.props;
    let newAnswerArray = [];
    
    if ( checked ) {
      // Add to answers
      if ( currentAnswers ) {
        newAnswerArray = [ ...currentAnswers, optionIndex ];
      } else {
        newAnswerArray = [ optionIndex ];
      }
    } else {
      // Remove from answers
      const answerIndex = currentAnswers.findIndex( answer => answer === optionIndex );
      newAnswerArray = [ ...currentAnswers.slice( 0, answerIndex ), ...currentAnswers.slice( answerIndex + 1, currentAnswers.length ) ];
    }
    
    select( currentQuestion, newAnswerArray );
  }

  render() {
    const { options, currentQuestion, currentAnswers } = this.props;

    return (
      <div>
        {
          options.map( ( option, i ) => (
            <div key={ i }>
              <input type="checkbox"
                     onChange={ ( e ) => this.updateAnswers( e.target.checked, currentQuestion, i ) } 
                     id={ i } 
                     defaultChecked={ currentAnswers ? currentAnswers.indexOf( i ) !== -1 : false } />
              <label htmlFor={ i }>{ option.text }</label>
            </div>
          ))
        }
      </div>
    )
  }
}