import { allDevices, allIngredients, allUstensils, inputTagDevices, inputTagIngredients, inputTagUstensils, listItemsDevices, listItemsIngredients, listItemsUstensils } from "./constantes.js";
import {  displayKeyWords } from "./displayFunctions.js";
import { normalize } from "./utils.js";

// Recherche des ingrédients
  export const getIngredients = (array) => {
    // Méthode flat() pour concaténer les éléments des tableaux imbriqués
    let allIngredients = array.map((recipe) => recipe.ingredients.map((liste) => liste.ingredient)).flat();
    allIngredients = Array.from(new Set (allIngredients)).sort()
    return allIngredients.map((element) => ({
      type: 'ingredient',
      name: element,
    }));
  };
  
  // Recherche des Appareils
  export const getAppliance = (array) => {
    let allAppliances = array.map((recipe) => recipe.appliance.toLowerCase());
    allAppliances = Array.from(new Set (allAppliances)).sort()
    return allAppliances.map((element) => ({
      type: "appareil",
      name: element,
    }));
  }
  
  // Recherche des Ustensiles
  export const getUstensils = (array) => {
    let allUstensils = array.map((recipe) => recipe.ustensils.map((liste) => liste.toLowerCase())).flat();
    allUstensils = Array.from(new Set (allUstensils)).sort()
    return allUstensils.map((element) => ({
      type: "ustensile",
      name: element,
    }));
  }
 

  // Fonction de recherche sur l'input du select ingrédients
  export const searchIngredientsFunctionTag = (arrayIngred, arrayRecipes) => {
    const inputValueToLower = normalize(inputTagIngredients.value)
    // Tous les ingrédients qui correspondent à l'input sont mis dans un array
    let ingredientsFilter = arrayIngred.filter(list => normalize(list.name).includes(inputValueToLower));
    ingredientsFilter = Array.from(new Set (ingredientsFilter))
    // Si moins de 3 caractères saisis, affichage des ingrédients non filtrés
    // Sinon, affichage des ingrédients filtrés selon les données saisies
    if(inputValueToLower.length < 3) {
      return displayKeyWords(arrayIngred, inputTagIngredients, listItemsIngredients, arrayRecipes)
    }
    return displayKeyWords(ingredientsFilter, inputTagIngredients, listItemsIngredients, arrayRecipes)
  }

  // Fonction de recherche sur l'input du select appareils
  export const searchDevicesFunctionTag = (arrayIngred, arrayRecipes) => {
    const inputValueToLower = normalize(inputTagDevices.value)
    // Tous les ingrédients qui correspondent à l'input sont mis dans un array
    let devicesFilter = allDevices.filter(list => normalize(list.name).includes(inputValueToLower));
    // Si moins de 3 caractères saisis, affichage des appareils non filtrées
    // Sinon, affichage des appareils filtrées selon les données saisies
    if(inputValueToLower.length < 3) {
      return displayKeyWords(arrayIngred, inputTagDevices, listItemsDevices, arrayRecipes)
    }
    return displayKeyWords(devicesFilter, inputTagDevices, listItemsDevices, arrayRecipes)
  }

  // Fonction de recherche sur l'input du select ustensiles
  export const searchUstensilsFunctionTag = (arrayIngred,arrayRecipes) => {
    const inputValueToLower = normalize(inputTagUstensils.value);
    // Tous les ustensiles qui correspondent à l'input sont mis dans un array
    let ustensilsFilter = allUstensils.filter(list => normalize(list.name).includes(inputValueToLower));
    // Si moins de 3 caractères saisis, affichage des ustensiles non filtrées
    // Sinon, affichage des recettes filtrées selon les données saisies
    if(inputValueToLower.length < 3) {
      return displayKeyWords(arrayIngred, inputTagUstensils, listItemsUstensils, arrayRecipes)
    }
    return displayKeyWords(ustensilsFilter, inputTagUstensils, listItemsUstensils, arrayRecipes)

  }