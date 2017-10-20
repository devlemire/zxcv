import { CATEGORIES } from '../ducks/reducer';

export default ( categories ) => {
  let newCategories = categories.map( ( category, i ) => {
    category = Object.assign({}, category);
    category.value = Math.floor( ( category.value / CATEGORIES[i].max ) * 100 );
    
    return category;
  });

  return newCategories;
};