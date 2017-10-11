export const CATEGORY_LABELS = [ 'web', 'ios', 'uiux', 'qa', 'salesforce' ];

const initialState = {
  answers: [],
  categories: [
    { value: 0, label: CATEGORY_LABELS[0] },
    { value: 0, label: CATEGORY_LABELS[1] },
    { value: 0, label: CATEGORY_LABELS[2] },
    { value: 0, label: CATEGORY_LABELS[3] },
    { value: 0, label: CATEGORY_LABELS[4] }
  ]
};


export const SELECT_ANSWER = 'SELECT_ANSWER';
export const CALCULATE_MODIFIERS = "CALCULATE_MODIFIERS";

export default function reducer( state = initialState, action ) {
  const { type, payload } = action;
  // console.log('Reduce hit:', action);
  let newState;

  switch( type ) {
    case SELECT_ANSWER: 
      newState = Object.assign({}, state);
      newState.answers = [ ...newState.answers ];
      newState.answers[ payload.questionNumber ] = payload.answer;
      return newState;

    case CALCULATE_MODIFIERS:
      newState = Object.assign({}, state);
      newState.categories = [ ...newState.categories ];
      
      for( var i = 0; i < payload.modifiers.length; i++ ) {
        newState.categories[i] = payload.modifiers[i];
      }

      return newState;

    default:
      return state;
  }
}

export function selectAnswer( questionNumber, answer ) {
  return {
    type: SELECT_ANSWER,
    payload: { questionNumber, answer }
  };
}

export function calculateModifiers( modifiers ) {
  return {
    type: CALCULATE_MODIFIERS,
    payload: { modifiers }
  };
}