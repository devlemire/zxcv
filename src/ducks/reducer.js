import questions from '../utils/questions.json';

const initialState = {
  answers: [],
  categories: [
    { value: 0, max: 15, label: 'web', display: 'Web Dev' }, 
    { value: 0, max: 15, label: 'ios', display: 'iOS Dev' }, 
    { value: 0, max: 18, label: 'uiux', display: 'UX Design' }, 
    { value: 0, max: 19, label: 'qa', display: 'QA' }, 
    { value: 0, max: 15, label: 'salesforce', display: 'Salesforce' } 
  ],
  hasCompleted: false,
  hasSubmitted: false
};

export const CATEGORY_MAXIMUMS = [ 15, 15, 18, 19, 15 ];

const SELECT_ANSWER = 'SELECT_ANSWER';
const CALCULATE_MODIFIERS = "CALCULATE_MODIFIERS";
const RESET = "RESET";
const SUBMITTED = "SUBMITTED";

export default function reducer( state = initialState, action ) {
  const { type, payload } = action;
  // console.log('Reduce hit:', action);
  let newState;

  switch( type ) {
    case SELECT_ANSWER: 
      newState = Object.assign({}, state);
      newState.answers = [ ...newState.answers ];
      newState.answers[ payload.questionNumber ] = { selected: payload.selected, modifiers: [] };

      payload.selected.forEach( selected => {
        const modifiers = questions[ payload.questionNumber ].options[ selected ].values;
        newState.answers[ payload.questionNumber ].modifiers.push( modifiers );
      });

      return newState;

    case CALCULATE_MODIFIERS:
      newState = Object.assign({}, state);
      newState.categories = [ ...newState.categories ];

      let { answers } = payload;
      
      answers.forEach( answer => {
        if ( answer && answer.modifiers ) {
          answer.modifiers.forEach( modifier => {
            modifier.forEach( ( value, index ) => {
              newState.categories[ index ] = Object.assign({}, newState.categories[ index ]);
              newState.categories[ index ].value += value;
            });
          });
        }
      });
      
      newState.hasCompleted = true;
      return newState;

    case RESET:
      return Object.assign({}, initialState);

    case SUBMITTED:
      return Object.assign({}, state, { hasSubmitted: true } );
      
    default:
      return state;
  }
}

export function selectAnswer( questionNumber, selected ) {
  return {
    type: SELECT_ANSWER,
    payload: { questionNumber, selected }
  };
}

export function calculateModifiers( answers ) {
  return {
    type: CALCULATE_MODIFIERS,
    payload: { answers }
  };
}

export function reset() {
  return {
    type: RESET,
    payload: null
  };
}

export function submitted() {
  return {
    type: SUBMITTED,
    payload: null
  };
}