import { allDevices, allIngredients, allUstensils, inputTagDevices, inputTagIngredients, inputTagUstensils } from "./constantes.js";
import { displayDevices, displayIngredients, displayRecipes, displayRecipesMatchByInputSelectDevices, displayRecipesMatchByInputSelectIngredient, displayRecipesMatchByInputSelectUstensils, displayUstensils, noRecipesMatch } from "./displayFunctions.js";
import { recipes } from "./recipes.js";

// Recherche des ingrédients
  export const getIngredients = (array) => {
    let allIngredients = [];
    array.forEach((recipe) => {
      recipe.ingredients.forEach((liste) => {
          allIngredients.push(liste.ingredient);
      });
    });
    allIngredients = Array.from(new Set (allIngredients))
    return allIngredients.map((element) => ({
      type: 'ingredient',
      name: element,
    }));
  };
  
  // Recherche des Appareils
  export const getAppliance = (array) => {
    let allAppliances = [];
    array.forEach((recipe) => {
      allAppliances.push(recipe.appliance.toLowerCase())
    });
    allAppliances = Array.from(new Set (allAppliances))
    return allAppliances.map((element) => ({
      type: "appareil",
      name: element,
    }));
  }
  
  // Recherche des Ustensiles
  export const getUstensils = (array) => {
    let allUstensils = [];
    array.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
      allUstensils.push(ustensil.toLowerCase())
      });
    });
    allUstensils = Array.from(new Set (allUstensils))
    return allUstensils.map((element) => ({
      type: "ustensile",
      name: element,
    }));
  }

  // Fonction de recherche sur l'input du select ingrédients
  export const searchIngredientsFunctionTag = () => {
    // Utilisation de NFD qui décompose les caractères spéciaux. Le "è" de "Crème" finit par s'exprimer par "e" + "`", ensuite on remplace les caractères spéciaux par "".
    const inputValueToLower = inputTagIngredients.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // Tous les ingrédients qui correspondent à l'input sont mis dans un array
    let ingredientsFilter = allIngredients.filter(list => list.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputValueToLower));
    ingredientsFilter = Array.from(new Set (ingredientsFilter))
    const ingredientsListFilter = ingredientsFilter.map(list => list.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
    // Affichage des recettes correspondants à chaques ingrédients mis dans le tableau précédents.
    displayRecipesMatchByInputSelectIngredient(ingredientsListFilter);
    // Si moins de 3 caractères saisis, affichage des recettes non filtrées
    // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
    // Sinon, affichage des recettes filtrées selon les données saisies
    if(inputValueToLower.length < 3) {
      displayIngredients(allIngredients)
      return displayRecipes(recipes)
    } if (!ingredientsFilter.length) {
      return noRecipesMatch()
    }
    return displayIngredients(ingredientsFilter)
  }

  // Fonction de recherche sur l'input du select appareils
  export const searchDevicesFunctionTag = () => {
    // Utilisation de NFD qui décompose les caractères spéciaux. Le "è" de "Crème" finit par s'exprimer par "e" + "`", ensuite on remplace les caractères spéciaux par "".
    const inputValueToLower = inputTagDevices.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // Tous les ingrédients qui correspondent à l'input sont mis dans un array
    let devicesFilter = allDevices.filter(list => list.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputValueToLower));
    let devicesListFilter = devicesFilter.map(list => list.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
    devicesListFilter = Array.from(new Set (devicesListFilter))
    // Affichage des recettes correspondants à chaques ingrédients mis dans le tableau précédents.
    displayRecipesMatchByInputSelectDevices(devicesListFilter);
    // Si moins de 3 caractères saisis, affichage des recettes non filtrées
    // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
    // Sinon, affichage des recettes filtrées selon les données saisies
    if(inputValueToLower.length < 3) {
      displayDevices(allDevices)
      return displayRecipes(recipes)
    } if (!devicesFilter.length) {
      return noRecipesMatch()
    }
    return displayDevices(devicesFilter)

  }

  // Fonction de recherche sur l'input du select ustensiles
  export const searchUstensilsFunctionTag = () => {
    // Utilisation de NFD qui décompose les caractères spéciaux. Le "è" de "Crème" finit par s'exprimer par "e" + "`", ensuite on remplace les caractères spéciaux par "".
    const inputValueToLower = inputTagUstensils.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // Tous les ustensiles qui correspondent à l'input sont mis dans un array
    let ustensilsFilter = allUstensils.filter(list => list.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(inputValueToLower));
    let ustensilsListFilter = ustensilsFilter.map(list => list.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
    ustensilsListFilter = Array.from(new Set (ustensilsListFilter))
    // Affichage des recettes correspondants à chaques ustensiles mis dans le tableau précédents.
    displayRecipesMatchByInputSelectUstensils(ustensilsListFilter);
    // Si moins de 3 caractères saisis, affichage des recettes non filtrées
    // Si l'array des résultats matchant avec l'input à une longueur de 0, message d'erreur
    // Sinon, affichage des recettes filtrées selon les données saisies
    if(inputValueToLower.length < 3) {
      displayUstensils(allUstensils)
      return displayRecipes(recipes)
    } if (!ustensilsFilter.length) {
      return noRecipesMatch()
    }
    return displayUstensils(ustensilsFilter)

  }