import React, { Component } from 'react';

export default class One extends Component {
  handleSelect( currentQuestion, i ) {
    const { select } = this.props;

    let radioBtn = document.getElementById(`input-${i}`);
    radioBtn.checked = true;

    select( currentQuestion, [ i ] );
  }

  render() {
    const { options, currentQuestion, currentAnswers } = this.props;

    return (
      <div>
        <ul>
        {
          options.map( (option, i) => (
            <div key={ i } onClick={ () => this.handleSelect( currentQuestion, i ) }>
              <input id={ `input-${i}` }
                     type="radio"
                     name="option"
                     defaultChecked={ currentAnswers[0] === i } />
              <label htmlFor="option">{ option.text }</label>
            </div>
          ))
        }
        </ul>
      </div>
    )
  }
}