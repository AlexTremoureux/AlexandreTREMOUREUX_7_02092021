import { Recipe } from "./classRecipe.js";
import { Tags } from "./classTags.js";
import { wrapper } from "./constantes.js";

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
      recipe = new Recipe(recipe.name,recipe.time,recipe.ingredients,recipe.description)
    })
}

// Affichage des ingrédients dans le select
export const displayKeyWords = (arrayIngred, input, dest, arrayRecipe) => {
  const tags = new Tags;
  dest.innerHTML=``;
  arrayIngred.forEach(ingredient => {
      dest.innerHTML+=`<li><div class='keyword'>${ingredient.name}</div></li>`
  });
  // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
  const keyword = document.querySelectorAll('.keyword')
  keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
          let newTag = keywordItem.innerHTML;
          input.value = '';
          tags.addTag(newTag, arrayRecipe)
      })
  })
}

// Ouverture du dropdown
export const open = (visible, hidden, icon) => {
  hidden.style.display = 'none';
  visible.style.display = 'flex';
  icon.classList.add('up');
}
// fermeture du dropdown
export const close = (visible, hidden, icon) => {
  visible.style.display = 'block';
  hidden.style.display = 'none';
  icon.classList.remove('up');
}
// Gestion du click en dehors des dropdowns
export function hideOnClickOutside(elementHidden, elementVisible, icon) {
  const outsideClickListener = event => {
      if (!elementHidden.contains(event.target) && icon.className.includes('up') ) {
        elementHidden.lastElementChild.style.display = 'none'
        elementVisible.style.display = 'block';
        icon.classList.remove('up');
      }
  }
  document.addEventListener('click', outsideClickListener)
}