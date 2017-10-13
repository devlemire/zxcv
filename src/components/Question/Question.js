import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAnswer } from '../../ducks/reducer';

import questions from '../../utils/questions.json';
import One from './One/One';
import Multiple from './Multiple/Multiple';
import Navigation from '../Navigation/Navigation';

class Question extends Component {
  componentWillReceiveProps( nextProps ) {
    const { answers } = nextProps;
    const { index } = nextProps.match.params;

    this.setState({ 
      question: questions[ index ],
      currentQuestion: parseInt( index, 10 ),
      currentAnswers: answers[ index ] ? answers[ index ].selected : []
    });
  }

  constructor( props ) {
    super( props );
    const { answers } = this.props;
    const { index } = this.props.match.params;

    this.state = { 
      question: questions[ index ],
      currentQuestion: parseInt( index, 10 ),
      currentAnswers: answers[ index ] ? answers[ index ].selected : []
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
  return {
    answers: state.answers
  };
}

export default connect( mapStateToProps, { selectAnswer } )( Question );