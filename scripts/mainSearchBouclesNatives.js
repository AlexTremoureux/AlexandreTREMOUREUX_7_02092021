/* eslint-disable no-continue */

import { comparaison, isInTheArray, normalize } from './utils.js'

export const searchBouclesNatives = (input, arrayRecipes) => {
  console.time('test')
  let arrayFilter = []
  // Itération sur la liste de toutes les recettes existantes
  for (let i = 0; i < arrayRecipes.length; i += 1) {
    const recipe = arrayRecipes[i]
    const arrayWordsTitleRecipe = [normalize(recipe.name)]
    const arrayWordsDescriptionRecipe = normalize(recipe.description).split(' ')
    const ingredientsOfRecipe = recipe.ingredients

    // Si le titre de la recette courante correspond à l'input, ajout de la recette au tableau
    for (let j = 0; j < arrayWordsTitleRecipe.length; j += 1) {
      const isTrue = comparaison(arrayWordsTitleRecipe[j], input)
      if (isTrue) {
        arrayFilter = [...arrayFilter, recipe]
      }
    }
    // Si l'id de la recette courante est présente dans le tableau on passe à la recette suivante
    if (isInTheArray(recipe.id, arrayFilter)) {
      continue
    }

    // Si un mot de la description de la recette courante correspond à l'input, ajout de la recette au tableau
    for (let k = 0; k < arrayWordsDescriptionRecipe.length; k += 1) {
      const isTrue = comparaison(arrayWordsDescriptionRecipe[k], input)
      if (isTrue) {
        arrayFilter = [...arrayFilter, recipe]
        break
      }
    }
    // Si l'id de la recette courante est présente dans le tableau on passe à la recette suivante
    if (isInTheArray(recipe.id, arrayFilter)) {
      continue
    }

    // Si un des ingrédients de la recette courante correspond à l'input, ajout de la recette au tableau
    for (let m = 0; m < ingredientsOfRecipe.length; m += 1) {
      const listOfIngredient = ingredientsOfRecipe[m]
      const arrayOfIngredientsRecipe = [normalize(listOfIngredient.ingredient)]
      for (let n = 0; n < arrayOfIngredientsRecipe.length; n += 1) {
        const isTrue = comparaison(arrayOfIngredientsRecipe[n], input)
        if (isTrue) {
          arrayFilter = [...arrayFilter, recipe]
        }
      }
    }
  }
  console.timeEnd('test')
  return arrayFilter
}
