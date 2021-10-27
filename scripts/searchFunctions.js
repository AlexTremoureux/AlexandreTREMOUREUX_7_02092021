import { capitalizeFirstLetter, normalize } from './utils.js'

// Recherche des ingrédients
export const getIngredients = (array) => {
  // Méthode flat() pour concaténer les éléments des tableaux imbriqués
  let allIngredients = array
    .map((recipe) =>
      recipe.ingredients.map((liste) => normalize(liste.ingredient))
    )
    .flat()
  allIngredients = Array.from(new Set(allIngredients)).sort()
  return allIngredients.map((element) => ({
    type: 'ingredient',
    name: capitalizeFirstLetter(element),
  }))
}

// Recherche des Appareils
export const getAppliance = (array) => {
  let allAppliances = array.map((recipe) => normalize(recipe.appliance))
  allAppliances = Array.from(new Set(allAppliances)).sort()
  return allAppliances.map((element) => ({
    type: 'appareil',
    name: capitalizeFirstLetter(element),
  }))
}

// Recherche des Ustensiles
export const getUstensils = (array) => {
  let allUstensils = array
    .map((recipe) => recipe.ustensils.map((liste) => normalize(liste)))
    .flat()
  allUstensils = Array.from(new Set(allUstensils)).sort()
  return allUstensils.map((element) => ({
    type: 'ustensile',
    name: capitalizeFirstLetter(element),
  }))
}

// Fonction de recherche sur l'input du select ingrédients
export const searchIngredientsFunctionTag = (input, array) => {
  const allIngred = getIngredients(array)
  // Tous les ingrédients qui correspondent à l'input sont mis dans un array
  let ingredientsFilter = allIngred.filter((list) =>
    normalize(list.name).includes(input)
  )
  ingredientsFilter = Array.from(new Set(ingredientsFilter))
  return ingredientsFilter
}

// Fonction de recherche sur l'input du select appareils
export const searchDevicesFunctionTag = (input, array) => {
  const allDevices = getAppliance(array)
  // Tous les ingrédients qui correspondent à l'input sont mis dans un array
  const devicesFilter = allDevices.filter((list) =>
    normalize(list.name).includes(input)
  )
  return devicesFilter
}

// Fonction de recherche sur l'input du select ustensiles
export const searchUstensilsFunctionTag = (input, array) => {
  const allUstensils = getUstensils(array)
  // Tous les ustensiles qui correspondent à l'input sont mis dans un array
  const ustensilsFilter = allUstensils.filter((list) =>
    normalize(list.name).includes(input)
  )
  return ustensilsFilter
}
