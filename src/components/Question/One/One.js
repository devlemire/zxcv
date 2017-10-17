import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default class One extends Component {
  handleSelect( currentQuestion, i ) {
    const { select } = this.props;
    select( currentQuestion, [ i ] );
  }

  render() {
    const { options, currentQuestion, currentAnswers } = this.props;

    return (
      <div>
        <RadioButtonGroup name="answers" defaultSelected={ currentAnswers[0] }>
        {
          options.map( (option, i) => (
            <RadioButton key={ i }
                         onClick={ () => this.handleSelect( currentQuestion, i ) }
                         value={ i }
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