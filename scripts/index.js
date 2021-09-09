import {recipes} from './recipes.js'
import { search, wrapper } from './constantes.js'
import { displayAllRecipes, mainSearchDisplayMatchRecipes } from './displayFunctions.js';

// Affichage de toutes les recettes au chargement de la page
displayAllRecipes(recipes);

// Barre de recherche principale V1
search.addEventListener('keyup', () => {
  const inputValueToLower = search.value.toLowerCase();
  // Retourne les recettes dont le titre inclu la valeur saisie par l'utilisateur
  const resultName = recipes.filter(recipe => recipe.name.toLowerCase().includes(inputValueToLower));
  // Retourne les recettes dont la description inclue la valeur saisie par l'utilisateur
  const resultDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(inputValueToLower));
  // Retourne les recettes dont les ingrédients incluent la valeur saisie par l'utilisateur
  const resultIngredient = recipes.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.toLowerCase()).includes(inputValueToLower));
  // Suppression des doublons et création d'un array
  const arrayRecipesMatch = Array.from (new Set ([... resultName, ... resultDescription, ... resultIngredient]));
  // Affichage des recettes correspondantes
  mainSearchDisplayMatchRecipes(inputValueToLower, arrayRecipesMatch)
})


const filterSelect = document.querySelectorAll('.filter__select');
filterSelect.forEach(filter => filter.addEventListener('click', (e) => {
  const wrapperInputFilter = document.querySelectorAll('.wrapperInputFilter')
  const labelInput = document.querySelectorAll('.labelInput')
  console.log(e.currentTarget.nextElementSibling)
  wrapperInputFilter.forEach(item =>item.style.display = 'flex')
  labelInput.forEach(item => item.style.display = 'none')
}))
    



