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

  return {
    selected,
    percent,
    categories
  };
};