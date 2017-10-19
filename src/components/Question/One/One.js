import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default class One extends Component {
  handleSelect( currentQuestion, i ) {
    const { select } = this.props;
    select( currentQuestion, [ i ] );
  }

  render() {
    const { options, currentQuestion, currentAnswers } = this.props;
    console.log( options, currentQuestion, currentAnswers, currentAnswers[0] );

    return (
      <div className="OneAnswer__container">
        <RadioButtonGroup name={ `radio-group-${ currentQuestion }` }>
        {
          options.map( (option, i) => (
            <RadioButton key={ `radio-${ currentQuestion }-${ i }` }
                         onClick={ () => this.handleSelect( currentQuestion, i ) }
                         value={ i }
                         checked={ currentAnswers[0] === i }
                         label={ option.text }
                         iconStyle={ { fill: '#3fbaf9' } }
                         labelStyle={ { fontFamily: "'Merriweather Sans', sans-serif" } }
                         style={ { marginBottom: 16 } }
            />
          ))
        }
        </RadioButtonGroup>
      </div>
    )
  }
}