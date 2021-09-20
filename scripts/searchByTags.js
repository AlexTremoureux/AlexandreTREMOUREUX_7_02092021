import { Tags } from "./classTags.js";
import { filterIngredientSelect, listItems, wrapperInputFilter } from "./constantes.js";
import { displayRecipes } from "./displayFunctions.js";
import { recipes } from "./recipes.js";
import { getIngredients } from "./searchFunctions.js";

const arrayTagSelect = []
export const selectIngredient = () => {
    const displaySelectIngredients = (() => {
        filterIngredientSelect.addEventListener('click', (e) => {
            const labelInput = filterIngredientSelect.querySelector('.labelInput');
            labelInput.style.display = 'none';
            wrapperInputFilter.style.display = 'flex';
        });
    })();
    const displayTagsIngredient = (() => {
        getIngredients().forEach(ingredient => {
            listItems.innerHTML += `<li><button class='keyword'>${ingredient.name}</button></li>`
            //console.log(ingredient)
        });
    })();

    const searchInArray = (array) => {
        array.forEach(itemTag => {
            const resultIngredient = recipes.filter(recipe => recipe.ingredients.map(ingre => ingre.ingredient.toLowerCase()).includes(itemTag.toLowerCase()));
            const arrayRecipesMatch = Array.from (new Set ([... resultIngredient]));
            return displayRecipes(arrayRecipesMatch)
        });
    }

    const keyword = document.querySelectorAll('.keyword')
    const keywordIsSelected = (() => {
        keyword.forEach((keywordItem) => {
            keywordItem.addEventListener('click', () => {
                let newTags = keywordItem.innerHTML;
                const newKeywordItem = new Tags(newTags);
                //arrayTagSelect.push(newTags);
                //searchInArray(arrayTagSelect)
            })
        })
    })()
    
}