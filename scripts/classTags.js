import {recipes} from './recipes.js'
import { displayRecipes } from './displayFunctions.js';
import { tagsArray } from './constantes.js';

export class Tags {
tagList = [];
recipesFilterByTags = recipes;

    constructor () {
    }

    displayTags = () => {
        const wrapperTags = document.getElementById('wrapperTags');
        if (this.tagList.length) {
            wrapperTags.innerHTML = ``;
            this.tagList.forEach(tag => {
                wrapperTags.innerHTML += `<div class='tags'>${tag}<img class='closeTag' src="./images/close.svg" alt=""></div>`;
            });
        }
    }
    filterRecipesByTagsTypeIngredient = () => {
        const resultIngredient = this.recipesFilterByTags.filter(recipe => {
            const ingredientList = recipe.ingredients.map(item => item.ingredient);
            const filter = this.tagList.filter(tag => ingredientList.includes(tag))
            return filter.length === this.tagList.length;
        });
        this.recipesFilterByTags = resultIngredient;
        !recipesFilterByTags.length?noRecipesMatch():displayRecipes(resultIngredient)
    }
    addTag = (newTag) => {
        this.tagList.push(newTag);
        this.displayTags();
        this.filterRecipesByTagsTypeIngredient();
    }
    
}