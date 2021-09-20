import {recipes} from './recipes.js'
import { displayRecipes } from './displayFunctions.js';
import { tagsArray } from './constantes.js';

export class Tags {

    constructor (name) {
        this.element = this.buildDOM(name);
        this.name = name;
        this.filterByTag(name)
    }
    buildDOM(name) {
        this.name = name;
        const wrapperTags = document.querySelector('.wrapperTags');
        const container = document.createElement('div');
        container.classList.add('tags');
        const value = document.createElement('button');
        wrapperTags.appendChild(container);
        container.appendChild(value);
        value.innerHTML+=`${this.name}`
        const btnClose = document.createElement('img');
        btnClose.classList.add('btnClose')
        btnClose.src = './images/close.svg';
        value.appendChild(btnClose);
        
        btnClose.addEventListener('click',close = () => {
            wrapperTags.remove(container)
        } )
    }
    filterByTag(name) {
        const wrapperTags = document.querySelector('.wrapperTags')
        this.name = name;
        tagsArray.push(name.toLowerCase())
        const resultIngredient = recipes.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.toLowerCase()).includes(tagsArray[0]));
        const arrayRecipesMatch = Array.from (new Set ([... resultIngredient]));
        let arrayFilterByTag = arrayRecipesMatch
        
        if (tagsArray.length > 1) {
            const newResultIngredient = arrayFilterByTag.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.toLowerCase()).includes(tagsArray[1]))
            displayRecipes(newResultIngredient)
        } 
        //wrapperTags.childElementCount?
        else displayRecipes(arrayRecipesMatch)

    }
    
}