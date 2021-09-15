import {recipes} from './recipes.js'
import { search, wrapper } from './constantes.js'
import { displayAllRecipes, mainSearchDisplayMatchRecipes } from './displayFunctions.js';
import { getIngredients } from './searchFunctions.js';

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
  console.log(e.currentTarget.firstChild)
  const wrapperInputFilter = filter.querySelector('.wrapperInputFilter')
  const labelInput = filter.querySelector('.labelInput')
  const listItems = document.createElement('ul');
  listItems.classList.add('listItems');
  
  wrapperInputFilter.style.display = 'flex'
  labelInput.style.display = 'none';
  wrapperInputFilter.appendChild(listItems)
  getIngredients().forEach(ingredient => {
    wrapperInputFilter.innerHTML += `
    <li>
    <a>${ingredient.name}</a>
    </li>
    `
  })
  
}))
    



