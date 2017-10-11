import questions from './questions.json';
import { CATEGORY_LABELS } from '../ducks/reducer';

export default function calculateCategories( answers ) {
  let modifiers = [];
  let formattedModifiers = [];
  var i, j;

  if ( answers.length > 0 ) {
    
    for( i = 0; i < CATEGORY_LABELS.length; i++ ) {
      formattedModifiers.push({ value: 0, label: CATEGORY_LABELS[i] });
    }

    for( i = 0; i < answers.length; i++ ) {
      if ( Array.isArray( answers[i] ) ) {
        for( j = 0; j < answers[i].length; j++ ) {
          modifiers.push( questions[i].options[ answers[i][j] ].values );
        } 
      } else {
        modifiers.push( questions[i].options[ answers[i] ].values );
      }
    }
    
    for( i = 0; i < modifiers.length; i++ ) {
      for( j = 0; j < modifiers[i].length; j++ ) {
        formattedModifiers[j].value += modifiers[i][j];
      }
    }

    return formattedModifiers;
  }

  return 'No answers set by the user.';
}