import questions from './questions.json';
import { CATEGORY_LABELS } from '../ducks/reducer';

export default function calculateCategories( answers) {
  let modifiers = [];
  let formattedModifiers = [];
  var i;

  for( i = 0; i < CATEGORY_LABELS.length; i++ ) {
    formattedModifiers.push({ value: 0, label: CATEGORY_LABELS[i] });
  }

  if ( answers.length > 0 ) {
    for( i = 0; i < answers.length; i++ ) {
      if ( Array.isArray( answers[i] ) ) {
        for( var j = 0; j < answers[i].length; j++ ) {
          modifiers.push( questions[i].options[ answers[i][j] ].values );
        } 
      } else {
        modifiers.push( questions[i].options[ answers[i] ].values );
      }
    }
  
    for( i = 0; i < modifiers.length; i++ ) {
      formattedModifiers[0].value += modifiers[i][0];
      formattedModifiers[1].value += modifiers[i][1];
      formattedModifiers[2].value += modifiers[i][2];
      formattedModifiers[3].value += modifiers[i][3];
      formattedModifiers[4].value += modifiers[i][4];
    }

    return formattedModifiers;
  }

  return 'No answers set by the user.';
}