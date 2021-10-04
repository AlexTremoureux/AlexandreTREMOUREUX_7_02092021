import { Recipe } from "./classRecipe.js";
import { Tags } from "./classTags.js";
import { listItemsDevices, listItemsIngredients, listItemsUstensils, wrapper } from "./constantes.js";
import { recipes } from "./recipes.js";

// Si aucun résultat ne match, affichage d'un message avec suggestion de recherche
export const noRecipesMatch = () => {
  wrapper.innerHTML = '';
  wrapper.innerHTML += `
      <p class="noResult">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`
}
// Affichage des recettes à partir d'un array
export const displayRecipes = (array) => {
  wrapper.innerHTML = '';
    array.forEach((recipe) => {
      let listeIngredients = [];
      recipe.ingredients.forEach((liste) => {
        listeIngredients.push(liste.ingredient);
      })
      recipe = new Recipe(recipe.name,recipe.time,recipe.ingredients,recipe.description)
    })
}
// Affichage des ingrédients dans le select
export const displayIngredients = (array) => {
  const tags = new Tags;
  listItemsIngredients.innerHTML=``;
  array.forEach(ingredient => {
      listItemsIngredients.innerHTML+=`<li><div class='keyword'>${ingredient.name}</div></li>`
  });
  // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
  const keyword = document.querySelectorAll('.keyword')
  keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
          let newTag = keywordItem.innerHTML;
          tags.addTag(newTag)
      })
  })
}

// Affichage des appareils dans le select
export const displayDevices = (array) => {
  const tags = new Tags;
  listItemsDevices.innerHTML=``;
  array.forEach(appliance => {
      listItemsDevices.innerHTML+=`<li><div class='keyword'>${appliance.name}</div></li>`
  });
  // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
  const keyword = document.querySelectorAll('.keyword')
  keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
          let newTag = keywordItem.innerHTML;
          tags.addTag(newTag)
      })
  })
}

// Affichage des ustensiles dans le select
export const displayUstensils = (array) => {
  const tags = new Tags;
  listItemsUstensils.innerHTML=``;
  array.forEach(ustensil => {
    listItemsUstensils.innerHTML+=`<li><div class='keyword'>${ustensil.name}</div></li>`
  });
  // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
  const keyword = document.querySelectorAll('.keyword')
  keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
          let newTag = keywordItem.innerHTML;
          tags.addTag(newTag)
      })
  })
}

// Affichage des recettes correspondants à chaques ingrédients mis dans le tableau précédent.
export const displayRecipesMatchByInputSelectIngredient = (array) => {
  let arrayRecipeMatchByIngredient = []
  array.forEach(element => {
    const recipeMatchByIngredient = recipes.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()).includes(element));
    arrayRecipeMatchByIngredient.push(...recipeMatchByIngredient)
  });
  arrayRecipeMatchByIngredient = Array.from(new Set (arrayRecipeMatchByIngredient))
  return !arrayRecipeMatchByIngredient.length ? noRecipesMatch() : displayRecipes(arrayRecipeMatchByIngredient);
}

// Affichage des recettes correspondants à chaques appareils mis dans le tableau précédent.
export const displayRecipesMatchByInputSelectDevices = (array) => {
  let arrayRecipeMatchByDevices = []
  array.forEach(element => {
    const recipeMatchByDevices = recipes.filter(recipe => recipe.appliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(element));
    arrayRecipeMatchByDevices.push(...recipeMatchByDevices)
  });
  arrayRecipeMatchByDevices = Array.from(new Set (arrayRecipeMatchByDevices))
  return !arrayRecipeMatchByDevices.length ? noRecipesMatch() : displayRecipes(arrayRecipeMatchByDevices);
}

// Affichage des recettes correspondants à chaques ustensile mis dans le tableau précédent.
export const displayRecipesMatchByInputSelectUstensils = (array) => {
  let arrayRecipeMatchByUstensils = []
  array.forEach(element => {
    const recipeMatchByUstensils = recipes.filter(recipe => recipe.ustensils.map(list => list.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()).includes(element));
    arrayRecipeMatchByUstensils.push(...recipeMatchByUstensils)
  });
  arrayRecipeMatchByUstensils = Array.from(new Set (arrayRecipeMatchByUstensils))
  return !arrayRecipeMatchByUstensils.length ? noRecipesMatch() : displayRecipes(arrayRecipeMatchByUstensils);
}