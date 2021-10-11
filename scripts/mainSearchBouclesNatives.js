import {recipes} from './recipes.js'
import { search } from './constantes.js'
import { displayDevices, displayIngredients, displayRecipes, displayUstensils, noRecipesMatch } from './displayFunctions.js';
import { getAppliance, getIngredients, getUstensils } from './searchFunctions.js';

export const searchBouclesNatives = () => {
    let arrayRecipesMatch = [];
    const inputValueToLower = search.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    console.log(inputValueToLower.length)
    const comparaison = (mot) => {
        for (let i = 0; i < inputValueToLower.length; i++) {
            const element = inputValueToLower[i];
            if (element !== mot[i])
            return false
        }
        return true
    }
    // Recherche par titre de recette
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        let arrayWordsTitleRecipe = recipe.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        arrayWordsTitleRecipe = [...arrayWordsTitleRecipe.split(" ")]
        //console.log(arrayWordsTitleRecipe)
        for (let i = 0; i < arrayWordsTitleRecipe.length; i++) {
            const element = arrayWordsTitleRecipe[i];
            let isTrue = comparaison(element)
            isTrue ? arrayRecipesMatch.push(recipe) : false;
        } 
    }
    // Recherche par ingrédients
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        let ingredientsOfRecipe = recipe.ingredients;
        let arrayOfIngredientsRecipe = []
        for (let index = 0; index < ingredientsOfRecipe.length; index++) {
            const listOfIngredient = ingredientsOfRecipe[index];
            arrayOfIngredientsRecipe = listOfIngredient.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            arrayOfIngredientsRecipe = [arrayOfIngredientsRecipe]
            for (let i = 0; i < arrayOfIngredientsRecipe.length; i++) {
                const element = arrayOfIngredientsRecipe[i];
                
                let isTrue = comparaison(element)
                isTrue ? arrayRecipesMatch.push(recipe) : false;
            } 
        }
    }
    // Recherche par description
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        let arrayWordsDescriptionRecipe = recipe.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        arrayWordsDescriptionRecipe = [...arrayWordsDescriptionRecipe.split(" ")]
        for (let i = 0; i < arrayWordsDescriptionRecipe.length; i++) {
            const element = arrayWordsDescriptionRecipe[i];
            
            let isTrue = comparaison(element)
            isTrue ? arrayRecipesMatch.push(recipe) : false;
        } 
    }
    // Suppression des doublons dans les recettes correspondant à l'input
    const noRepeat = (array) => {
        let arrayOfIndex = []
        let result = [];
        for (let i = 0; i < array.length; i++) {
        let doublon = false;
        const currentElement = array[i];
        for (let j = 0; j < array.length; j++) {
            const comp = array[j];
            if (currentElement === comp && i !== j && !arrayOfIndex.includes(j)) {
            arrayOfIndex = [...arrayOfIndex, i];
            doublon = true;
            }
        }
        result = doublon ? result : [...result, currentElement];
        }
        return result
    }

    arrayRecipesMatch = noRepeat(arrayRecipesMatch)

    // Affichage des recettes correspondantes aux saisies de l'input
    // Si moins de 3 caractères saisis, affichage des recettes, et des items des différents select non filtrés
    if(inputValueToLower.length < 3) {
        return displayRecipes(recipes)
    }
    if (!arrayRecipesMatch.length) {
        // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
        return noRecipesMatch()
    }
     // Sinon, affichage des recettes et des items des différents select filtrés selon les données saisies
     displayIngredients(getIngredients(arrayRecipesMatch))
     displayDevices(getAppliance(arrayRecipesMatch))
     displayUstensils(getUstensils(arrayRecipesMatch))
     return displayRecipes(arrayRecipesMatch)
}
