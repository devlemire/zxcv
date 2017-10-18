import questions from '../utils/questions.json';

export const CATEGORIES = [ 
  { value: 0, label: 'web', display: 'Web Dev' }, 
  { value: 0, label: 'ios', display: 'iOS Dev' }, 
  { value: 0, label: 'uiux', display: 'UX Design' }, 
  { value: 0, label: 'qa', display: 'QA' }, 
  { value: 0, label: 'salesforce', display: 'Salesforce' } 
];

const initialState = {
  answers: [],
  categories: CATEGORIES
};

export const SELECT_ANSWER = 'SELECT_ANSWER';
export const CALCULATE_MODIFIERS = "CALCULATE_MODIFIERS";
export const RESET = "RESET";

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
        answer.modifiers.forEach( modifier => {
          modifier.forEach( ( value, index ) => {
            newState.categories[index].value += value;
          });
        });
      });
      
      return newState;

    case RESET:
      return Object.assign({}, initialState);
      
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