import React, { Component } from 'react';

export default class Multiple extends Component {
  updateAnswers( checked, currentQuestion, optionIndex ) {
    const { select, currentAnswers } = this.props;
    let selected = [];
    
    if ( checked ) {
      // Add to answers
      if ( currentAnswers ) {
        selected = [ ...currentAnswers, optionIndex ];
      } else {
        selected = [ optionIndex ];
      }
    } else {
      // Remove from answers
      const answerIndex = currentAnswers.findIndex( answer => answer === optionIndex );
      selected = [ ...currentAnswers.slice( 0, answerIndex ), ...currentAnswers.slice( answerIndex + 1, currentAnswers.length ) ];
    }
    
    select( currentQuestion, selected );
  }

  render() {
    const { options, currentQuestion, currentAnswers } = this.props;

    return (
      <div>
        {
          options.map( ( option, i ) => (
            <div key={ `question-${ currentQuestion }-${ i }` }>
              <input type="checkbox"
                     onChange={ ( e ) => this.updateAnswers( e.target.checked, currentQuestion, i ) } 
                     id={ `label-${ currentQuestion }-${ i }` } 
                     defaultChecked={ currentAnswers ? currentAnswers.indexOf( i ) !== -1 : false } />
              <label htmlFor={ `label-${ currentQuestion }-${ i }` }>{ option.text }</label>
            </div>
          ))
        }
      </div>
    )
  }
}