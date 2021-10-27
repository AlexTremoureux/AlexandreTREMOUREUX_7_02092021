import { normalize } from './utils.js'

export const searchFunctionBuiltIn = (arrayRecipe, input) => {
  console.time('test')
  // Retourne les recettes dont le titre inclu la valeur saisie par l'utilisateur
  const resultName = arrayRecipe.filter((recipe) =>
    normalize(recipe.name).includes(input)
  )
  // Retourne les recettes dont la description inclue la valeur saisie par l'utilisateur
  const resultDescription = arrayRecipe.filter((recipe) =>
    normalize(recipe.description).includes(input)
  )
  // Retourne les recettes dont les ingrédients incluent la valeur saisie par l'utilisateur
  let resultIngredient = []
  arrayRecipe.forEach((recipe) => {
    recipe.ingredients.forEach((ingre) => {
      if (normalize(ingre.ingredient).includes(input)) {
        resultIngredient = [...resultIngredient, recipe]
      }
    })
  })
  // Suppression des doublons grace à l'objet Set et création d'une instance d'array
  arrayRecipe = Array.from(
    new Set([...resultName, ...resultDescription, ...resultIngredient])
  )
  console.timeEnd('test')
  return arrayRecipe
}
