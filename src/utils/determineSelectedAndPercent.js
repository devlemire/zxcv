export default ( categories, CATEGORIES ) => {
  let value = -1;
  let selected = null;

  categories.forEach( ( category, i ) => {
    category.value = Math.floor( ( category.value / CATEGORIES[i].max ) * 100 );

    if ( category.value > value ) {
      selected = category.label;
      value = category.value;
    }
  });

  let percent = value;

  categories.sort( ( a, b) => {
    if (a.value > b.value) {
      return -1;
    }

    if (a.value < b.value) {
      return 1;
    }
  
    return 0;
  });

  console.log( categories );

  return {
    selected,
    percent,
    categories
  };
};