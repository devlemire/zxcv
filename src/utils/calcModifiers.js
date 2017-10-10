import questions from './questions.json';

export default function calculateCategories( answers ) {
  let modifiers = [];
  let formattedModifiers = [ 0, 0, 0, 0, 0 ];
  var i;

  if ( answers.length > 0 ) {
    for( i = 0; i < questions.length; i++ ) {
      if ( Array.isArray( answers[i] ) ) {
        for( var j = 0; j < answers[i].length; j++ ) {
          modifiers.push( questions[i].options[ answers[i][j] ].values );
        } 
      } else {
        modifiers.push( questions[i].options[ answers[i] ].values );
      }
    }
  
    for( i = 0; i < modifiers.length; i++ ) {
      formattedModifiers[0] += modifiers[i][0];
      formattedModifiers[1] += modifiers[i][1];
      formattedModifiers[2] += modifiers[i][2];
      formattedModifiers[3] += modifiers[i][3];
      formattedModifiers[4] += modifiers[i][4];
    }

    return formattedModifiers;
  }

  return 'No answers set by the user.';
}