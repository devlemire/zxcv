import { CATEGORY_MAXIMUMS } from '../ducks/reducer';

export default ( categories ) => {
  let newCategories = categories.map( ( category, i ) => {
    category = Object.assign({}, category);
    category.value = Math.floor( ( category.value / CATEGORY_MAXIMUMS[i] ) * 100 );
    
    return category;
  });

  return newCategories;
};