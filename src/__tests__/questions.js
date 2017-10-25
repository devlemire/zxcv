import questions from '../utils/questions.json';

describe("questions.json tests", () => {
  test("Maximum values are calculated correctly", () => {
    let maximums = [ 0, 0, 0, 0, 0 ];

    questions.forEach( question => {
      let tempMax = 0;

      switch ( question.type ) {
        case 'one':

          question.options.forEach( option => {
            option.values.forEach( ( modifier, i ) => {
              if ( modifier > tempMax ) {
                maximums[i] += modifier;
                tempMax = modifier;
              }
            });
          });
          
          break;
        case 'multiple':

          question.options.forEach( option => {
            option.values.forEach( ( modifier, i ) => {
              if ( modifier >= 0 ) {
                maximums[i] += modifier;
              }
            });
          });

          break;

        default:
          break;
      }

    });

    console.log( maximums );
  });
});