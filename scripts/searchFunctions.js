import { recipes } from "./recipes.js";

// Recherche des ingrédients
const getIngredients = () => {
    let allIngredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((liste) => {
          allIngredients.push(liste.ingredient.toLowerCase());
      });
    });
    allIngredients = Array.from(new Set (allIngredients))
    return allIngredients.map((element) => ({
      type: 'ingredient',
      name: element,
    }));
  };
  
  // Recherche des Appareils
  const getAppliance = () => {
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
  const getUstensils = () => {
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