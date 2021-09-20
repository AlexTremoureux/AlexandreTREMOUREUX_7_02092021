import { recipes } from "./recipes.js";

// Recherche des ingrédients
  export const getIngredients = () => {
    let allIngredients = [];
    recipes.forEach((recipe) => {
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
  export const getAppliance = () => {
    let allAppliances = [];
    recipes.forEach((recipe) => {
      allAppliances.push(recipe.appliance.toLowerCase())
    });
    allAppliances = Array.from(new Set (allAppliances))
    return allAppliances.map((element) => ({
      type: "appareil",
      name: element,
    }));
  }
  
  // Recherche des Ustensiles
  export const getUstensils = () => {
    let allUstensils = [];
    recipes.forEach((recipe) => {
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