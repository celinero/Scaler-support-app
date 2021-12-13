import categories from '../data/categories';

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    resolve(categories);
  }) 
}