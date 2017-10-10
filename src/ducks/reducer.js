const initialState = {
  answers: [],
  categories: [
    { value: 0, label: 'Web' },
    { value: 0, label: 'iOS' },
    { value: 0, label: 'UI/UX' },
    { value: 0, label: 'QA' },
    { value: 0, label: 'Salesforce' }
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
      
      for( var i = 0; i < newState.categories.length; i++ ) {
        newState.categories[i].value = payload.modifiers[i];
      }

      console.log('Updated Categories:', newState);
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