import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export default class One extends Component {
  render() {
    const { options, currentQuestion, currentAnswers, select } = this.props;

    return (
      <div className="OneAnswer__container">
        <RadioButtonGroup name={ `radio-group-${ currentQuestion }` } 
                          valueSelected={ currentAnswers[0] } 
                          onChange={ (e, value) => select( currentQuestion, [ value ] ) }>
        {
          options.map( (option, i) => (
            <RadioButton key={ `radio-${ currentQuestion }-${ i }` }
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

One.propTypes = {
  options: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  currentAnswers: PropTypes.array.isRequired
}