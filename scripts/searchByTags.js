import {
  inputTagDevices,
  inputTagIngredients,
  inputTagUstensils,
  listItemsDevices,
  listItemsIngredients,
  listItemsUstensils,
} from './constantes.js'
import { displayKeyWords } from './displayFunctions.js'
import {
  getAppliance,
  getIngredients,
  getUstensils,
  searchDevicesFunctionTag,
  searchIngredientsFunctionTag,
  searchUstensilsFunctionTag,
} from './searchFunctions.js'
import { normalize } from './utils.js'

// Initialisation du select type ingrédients
export const selectIngredient = (arrayRecipes) => {
  const arrayIngred = getIngredients(arrayRecipes)
  // Fonction de recherche sur l'input du select ingredients
  inputTagIngredients.addEventListener('keyup', () => {
    const inputValueToLower = normalize(inputTagIngredients.value)
    const arrayIngredFilter = searchIngredientsFunctionTag(
      inputValueToLower,
      arrayRecipes
    )
    // Si moins de 3 caractères saisis, affichage des ingrédients non filtrés
    // Sinon, affichage des ingrédients filtrés selon les données saisies
    if (inputValueToLower.length < 3) {
      return displayKeyWords(
        arrayIngred,
        inputTagIngredients,
        listItemsIngredients,
        arrayRecipes
      )
    }
    return displayKeyWords(
      arrayIngredFilter,
      inputTagIngredients,
      listItemsIngredients,
      arrayRecipes
    )
  })
  displayKeyWords(
    arrayIngred,
    inputTagIngredients,
    listItemsIngredients,
    arrayRecipes
  )
}

// Initialisation du select type appareils
export const selectDevices = (arrayRecipes) => {
  const arrayDevice = getAppliance(arrayRecipes)
  // Fonction de recherche sur l'input du select appareil
  inputTagDevices.addEventListener('keyup', () => {
    const inputValueToLower = normalize(inputTagDevices.value)
    const arrayDeviceFilter = searchDevicesFunctionTag(
      inputValueToLower,
      arrayRecipes
    )
    // Si moins de 3 caractères saisis, affichage des appareils non filtrées
    // Sinon, affichage des appareils filtrées selon les données saisies
    if (inputValueToLower.length < 3) {
      return displayKeyWords(
        arrayDevice,
        inputTagDevices,
        listItemsDevices,
        arrayRecipes
      )
    }
    return displayKeyWords(
      arrayDeviceFilter,
      inputTagDevices,
      listItemsDevices,
      arrayRecipes
    )
  })
  displayKeyWords(arrayDevice, inputTagDevices, listItemsDevices, arrayRecipes)
}

// Initialisation du select type ustensiles
export const selectUstensils = (arrayRecipes) => {
  const arrayUstensils = getUstensils(arrayRecipes)
  // Fonction de recherche sur l'input du select appareil
  inputTagUstensils.addEventListener('keyup', () => {
    const inputValueToLower = normalize(inputTagUstensils.value)
    const arrayUstensFilter = searchUstensilsFunctionTag(
      inputValueToLower,
      arrayRecipes
    )
    // Si moins de 3 caractères saisis, affichage des ustensiles non filtrées
    // Sinon, affichage des recettes filtrées selon les données saisies
    if (inputValueToLower.length < 3) {
      return displayKeyWords(
        arrayUstensils,
        inputTagUstensils,
        listItemsUstensils,
        arrayRecipes
      )
    }
    return displayKeyWords(
      arrayUstensFilter,
      inputTagUstensils,
      listItemsUstensils,
      arrayRecipes
    )
  })
  displayKeyWords(
    arrayUstensils,
    inputTagUstensils,
    listItemsUstensils,
    arrayRecipes
  )
}
