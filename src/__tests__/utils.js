import CIP from '../utils/categoriesInPercent';
import sortCategories from '../utils/sortCategories';
import calculateWidth from '../utils/calculateWidth';

describe("utils/ tests", () => {
  test("calculateWidth returns percentage of width in pixel format", () => {
    expect( calculateWidth( 50, 200 ) ).toEqual( '100px' );
    expect( calculateWidth( 10, 100 ) ).toEqual( '10px' );
    expect( calculateWidth( 93, 200 ) ).toEqual( '186px' );
  });

  test("sortCategories should sort from greatest to least", () => {
    let categories = [{value:0},{value:20},{value:10},{value:5},{value:4},{value:30},{value:25}];
    sortCategories( categories );
    expect( categories ).toEqual([{value:30},{value:25},{value:20},{value:10},{value:5},{value:4},{value:0}]);
  });

  test("CIP converts modifier values into percentages and does not affect the passed in array", () => {
    const modifiers = [
      { value: 2, max: 15, label: 'web', display: 'Web Dev' }, 
      { value: 5, max: 15, label: 'ios', display: 'iOS Dev' }, 
      { value: 4, max: 18, label: 'uiux', display: 'UX Design' }, 
      { value: 3, max: 19, label: 'qa', display: 'QA' }, 
      { value: 2, max: 15, label: 'salesforce', display: 'Salesforce' }
    ];

    const newModifiers = CIP( modifiers );

    expect( modifiers ).not.toEqual( newModifiers );
    expect( newModifiers ).toEqual([
      { "display": "Web Dev", "label": "web", "max": 15, "value": 13 }, 
      { "display": "iOS Dev", "label": "ios", "max": 15, "value": 33 }, 
      { "display": "UX Design", "label": "uiux", "max": 18, "value": 22 }, 
      { "display": "QA", "label": "qa", "max": 19, "value": 15 }, 
      { "display": "Salesforce", "label": "salesforce", "max": 15, "value": 13 }
    ]);
  });
});