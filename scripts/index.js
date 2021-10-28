import { recipes } from './recipes.js'
import { search } from './constantes.js'
import {
  displayRecipes,
  eventClickOnSelectDevices,
  eventClickOnSelectIngredients,
  eventClickOnSelectUstensils,
  initSelect,
  noRecipesMatch,
} from './displayFunctions.js'
import { searchFunctionBuiltIn } from './mainSearchVersionBuiltIn.js'
import { normalize } from './utils.js'

// Gestion des ouvertures / fermetures des selects
eventClickOnSelectIngredients()
eventClickOnSelectDevices()
eventClickOnSelectUstensils()

let preFilter = recipes

// Listener sur l'input de la recherche principale
search.addEventListener('keyup', () => {
  // On réinitialise l'array à sa valeur initiale ainsi que les tags qui auraient été séléctionnés lors d'une précédente recherche
  preFilter = recipes
  const inputValueToLower = normalize(search.value)
  const wrapperTags = document.getElementById('wrapperTags')
  wrapperTags.innerHTML = ``
  // Si moins de 3 caractères saisis, affichage des recettes, et des mots clés des différents selects non filtrés
  if (inputValueToLower.length < 3) {
    initSelect(preFilter)
    return displayRecipes(preFilter)
  }
  // On applique le premier filtre correspondant à la valeur de l'input de la recherche principale
  const filter = searchFunctionBuiltIn(preFilter, inputValueToLower)
  preFilter = filter
  // Si le filtre ne donne aucun résultat, affichage d'un message d'erreur
  if (!preFilter.length) {
    return noRecipesMatch()
  }
  // Affichage des recettes et des mots clés des différents selects filtrés selon les données saisies
  initSelect(preFilter)
  return displayRecipes(preFilter)
})

// Affichage des recettes, et des mots clés des différents selects non filtrés pour que l'utilisateur puisse commencer par une recherche par mots clés
initSelect(preFilter)
displayRecipes(preFilter)
