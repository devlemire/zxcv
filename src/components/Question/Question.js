import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAnswer } from '../../ducks/reducer';

import questions from '../../utils/questions.json';
import One from './One/One';
import Multiple from './Multiple/Multiple';
import Navigation from '../Navigation/Navigation';

class Question extends Component {
  componentWillReceiveProps( nextProps ) {
    this.setState({ 
      question: questions[ nextProps.match.params.index ],
      currentQuestion: parseInt( nextProps.match.params.index, 10 ),
      currentAnswers: nextProps.answers[ nextProps.match.params.index ] || []
    });
  }

  constructor( props ) {
    super( props );
    this.state = {
      question: questions[ this.props.match.params.index ],
      currentQuestion: parseInt( this.props.match.params.index, 10 ),
      currentAnswers: this.props.answers[ this.props.match.params.index ] || []
    };
  }

  render() {
    const { selectAnswer } = this.props;
    const { question, currentQuestion, currentAnswers } = this.state;

    return (
      <div>
        <span>{ question.question }</span>

        {
          question.type === 'one'
          ?
            <One options={ question.options } 
                select={ selectAnswer } 
                currentQuestion={ currentQuestion }
                currentAnswers={ currentAnswers } />
          :
            <Multiple options={ question.options } 
                      select={ selectAnswer } 
                      currentQuestion={ currentQuestion }
                      currentAnswers={ currentAnswers } />
        }

        <Navigation history={ this.props.history } 
                    lastQuestion={ questions.length - 1 } 
                    currentQuestion={ currentQuestion } />
      </div>
    )
  }
}

function mapStateToProps( state ) {
  console.log('mapStateToProps:', state);
  return {
    answers: state.answers
  };
}

export default connect( mapStateToProps, { selectAnswer } )( Question );