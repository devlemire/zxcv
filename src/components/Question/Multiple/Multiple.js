import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

export default class Multiple extends Component {
  constructor() {
    super();
    this.state = {};

    this.updateAnswers = this.updateAnswers.bind( this );
  }

  updateAnswers( checked, currentQuestion, optionIndex ) {
    const { select, currentAnswers } = this.props;
    let selected = [];

    console.log( checked );
    
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
            <Checkbox label={ option.text }
                      checked={ currentAnswers ? currentAnswers.indexOf( i ) !== -1 : false }
                      onCheck={ ( e, checked ) => this.updateAnswers( checked, currentQuestion, i ) }
                      key={ `question-checkbox-${ i }` }
                      iconStyle={ { fill: '#3fbaf9' } }
                      labelStyle={ { fontFamily: "'Merriweather Sans', sans-serif" } }
                      style={ { marginBottom: 16 } }
            />
          ))
        }
      </div>
    )
  }
}