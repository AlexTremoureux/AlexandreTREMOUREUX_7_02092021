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
import { searchBouclesNatives } from './mainSearchBouclesNatives.js'
import { normalize } from './utils.js'

// Gestion des ouvertures / fermetures des selects
eventClickOnSelectIngredients()
eventClickOnSelectDevices()
eventClickOnSelectUstensils()

let preFilter = recipes

search.addEventListener('keyup', () => {
  // On réinitialise l'array à sa valeur initiale
  preFilter = recipes
  const inputValueToLower = normalize(search.value)
  const wrapperTags = document.getElementById('wrapperTags')
  wrapperTags.innerHTML = ``
  // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
  if (inputValueToLower.length < 3) {
    initSelect(preFilter)
    return displayRecipes(preFilter)
  }
  // On applique le premier filtre correspondant à la valeur de l'input mainSearch
  const filter = searchFunctionBuiltIn(preFilter, inputValueToLower)
  preFilter = filter
  // copieArrayRecipes = searchBouclesNatives(inputValueToLower, copieArrayRecipes)
  if (!preFilter.length) {
    return noRecipesMatch()
  }
  // Affichage des recettes et des items des différents select filtrés selon les données saisies
  initSelect(preFilter)
  return displayRecipes(preFilter)
})

initSelect(preFilter)
displayRecipes(preFilter)

/*
const filters = (() => {
  let copieArrayRecipes = recipes

  const filterMainSearch = (() => {
    search.addEventListener('keyup', () => {
      // On réinitialise l'array à sa valeur initiale
      copieArrayRecipes = recipes
      const inputValueToLower = normalize(search.value)

      // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
      if (inputValueToLower.length < 3) {
        initSelect(copieArrayRecipes)
        return displayRecipes(copieArrayRecipes)
      }
      // On applique le premier filtre correspondant à la valeur de l'input mainSearch
      copieArrayRecipes = searchFunctionBuiltIn(
        copieArrayRecipes,
        inputValueToLower
      )
      // copieArrayRecipes = searchBouclesNatives(inputValueToLower, copieArrayRecipes)
      if (!copieArrayRecipes.length) {
        return noRecipesMatch()
      }
      // Affichage des recettes et des items des différents select filtrés selon les données saisies
      initSelect(copieArrayRecipes)
      return displayRecipes(copieArrayRecipes)
    })
  })()

  // Si aucune entrée sur l'input, affichage des recettes et des items des différents select non filtrés
  initSelect(copieArrayRecipes)
  return displayRecipes(copieArrayRecipes)
})()
*/
