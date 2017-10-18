import questions from '../utils/questions.json';

export const CATEGORIES = {
  "web": {
    value: 0,
    display: 'Web Dev'
  },
  "ios": {
    value: 0,
    display: 'iOS Dev'
  },
  "uiux": {
    value: 0,
    display: 'UX Design'
  },
  "qa": {
    value: 0,
    display: 'Quality Assurance'
  },
  "salesforce": {
    value: 0,
    display: 'Salesforce'
  }
};

const initialState = {
  answers: [ { selected: [ 3 ] }, { selected: [ 2, 3] } ],

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
        const modifiers = questions[ payload.questionNumber ].options[ selected ];
        newState.answers[ payload.questionNumber ].modifiers.push( modifiers );
      });

      return newState;

    case CALCULATE_MODIFIERS:
      newState = Object.assign({}, state);
      newState.categories = [ ...newState.categories ];

      let { answers } = payload;

      answers.forEach( answer => {
        answer.modifiers.forEach( ( modifier, index ) => {
          newState.categories.web.value += modifier.web;
          newState.categories.ios.value += modifier.ios;
          newState.categories.uiux.value += modifier.uiux;
          newState.categories.qa.value += modifier.qa;
          newState.categories.salesforce += modifier.salesforce;
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