import { normalize } from './utils.js';


export const searchFunctionBuiltIn = (arrayRecipe, input) => {
  // Retourne les recettes dont le titre inclu la valeur saisie par l'utilisateur
  const resultName = arrayRecipe.filter(recipe => normalize(recipe.name).includes(input));
  // Retourne les recettes dont la description inclue la valeur saisie par l'utilisateur
  const resultDescription = arrayRecipe.filter(recipe => normalize(recipe.description).includes(input));
  // Retourne les recettes dont les ingrédients incluent la valeur saisie par l'utilisateur
  const resultIngredient = arrayRecipe.filter(recipe => recipe.ingredients.map(ingre =>  normalize(ingre.ingredient)).includes(input));
  // Suppression des doublons et création d'un array
  return arrayRecipe = Array.from (new Set ([... resultName, ... resultDescription, ... resultIngredient]));
}
