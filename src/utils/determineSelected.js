export default ( categories ) => {
  categories.sort( ( a, b) => {
    if (a.value > b.value) {
      return -1;
    }

    if (a.value < b.value) {
      return 1;
    }
  
    return 0;
  });

  return {
    selected,
    percent,
    categories
  };
};