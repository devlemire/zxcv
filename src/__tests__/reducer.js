import reducer from '../ducks/reducer';
import { CATEGORIES, selectAnswer, calculateModifiers, reset } from '../ducks/reducer';
import questions from '../utils/questions.json';

let state = null;
let initialState = null;

describe("Reducer Tests", () => {
  beforeEach(() => {
    state = reducer( undefined, { type: 'initialSetup' } );
    initialState = reducer( undefined, { type: 'initialSetup' } );
  });

  test("answers is initialized correctly", () => {
    expect( Array.isArray( state.answers ) ).toEqual( true );
    expect( state.answers.length ).toEqual( 0 );
  });

  test("CATEGORIES are initialized correctly and are being exported", () => {
    expect( CATEGORIES ).toEqual([
      { value: 0, max: 15, label: 'web', display: 'Web Dev' }, 
      { value: 0, max: 15, label: 'ios', display: 'iOS Dev' }, 
      { value: 0, max: 18, label: 'uiux', display: 'UX Design' }, 
      { value: 0, max: 19, label: 'qa', display: 'QA' }, 
      { value: 0, max: 15, label: 'salesforce', display: 'Salesforce' }
    ]);
  });

  test("selectAnswer action creator is being exported", () => {
    expect( typeof( selectAnswer ) ).toEqual( 'function' );
  });

  test("calculateModifiers action creator is being exported", () => {
    expect( typeof( calculateModifiers ) ).toEqual( 'function' );
  });

  test("reset action creator is being exported", () => {
    expect( typeof( reset ) ).toEqual( 'function' );
  });

  test("selectAnswer adds answer and its modifiers to answers ( single select )", () => {
    let testState = reducer( state, selectAnswer( 0, [0] ) );

    expect( testState.answers.length ).toEqual( 1 );
    expect( typeof( testState.answers[0] ) ).toEqual( 'object' );
    let answer = testState.answers[0];
    expect( Array.isArray( answer.selected ) ).toEqual( true );
    expect( Array.isArray( answer.modifiers ) ).toEqual( true );
    expect( answer.selected ).toEqual( [0] );
    expect( answer.modifiers ).toEqual( [ questions[0].options[0].values ] );
  });

  test("selectAnswer adds answer and its modifiers to answers ( multiple select )", () => {
    let testState = reducer( state, selectAnswer( 4, [0,1,2,8,7,6] ) );

    expect( testState.answers.length ).toEqual( 5 );
    expect( typeof( testState.answers[4] ) ).toEqual( 'object' );
    let answer = testState.answers[4];
    expect( Array.isArray( answer.selected ) ).toEqual( true );
    expect( Array.isArray( answer.modifiers ) ).toEqual( true );
    expect( answer.selected ).toEqual( [0,1,2,8,7,6] );

    for( var i = 0; i < answer.modifiers.length; i++ ) {
      expect( answer.modifiers[i] ).toEqual( questions[4].options[ answer.selected[i] ].values );
    }
  });

  test("selectAnswer keeps track of question number by index", () => {
    let testState0 = reducer( state, selectAnswer( 0, [0] ) );
    let testState1 = reducer( testState0, selectAnswer( 1, [1] ) );
    let testState2 = reducer( testState1, selectAnswer( 2, [2] ) );
    let finalState = reducer( testState2, selectAnswer( 3, [3] ) );

    expect( finalState.answers.length ).toEqual( 4 );

    for( var i = 0; i < finalState.length; i++ ) {
      expect( typeof( finalState.answers[i] ) ).toEqual( 'object' );
      let answer = finalState.answers[i];
      expect( Array.isArray( answer.selected ) ).toEqual( true );
      expect( Array.isArray( answer.modifiers ) ).toEqual( true );
      expect( answer.selected ).toEqual( [i] );
      expect( answer.modifiers ).toEqual( [ questions[i].options[i].values ] );
    }
  });

  test("calculateModifiers math is correct", () => {
    let calculatedState = null;
    let correctValues = [];

    CATEGORIES.forEach( category => {
      correctValues.push( 0 );
    });

    questions.forEach( (question, i) => {
      calculatedState = reducer( calculatedState || state, selectAnswer( i, [0] ) );
    });

    calculatedState = reducer( calculatedState, calculateModifiers( calculatedState.answers ) );
    const categories = calculatedState.categories;

    calculatedState.answers.forEach( answer => {
      answer.modifiers.forEach( modifier => {
        modifier.forEach( ( value, index ) => {
          correctValues[index] += value;
        });
      });
    });

    categories.forEach( (category, i) => {
      expect( category.value ).toEqual( correctValues[i] );
    });
  });
  
  test("reset sets store state back to the initialState", () => {
    state = reducer( state, reset() );
    expect( state ).toEqual( initialState );
  });
});