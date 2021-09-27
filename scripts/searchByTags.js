import { filterIngredientSelect, listItems, wrapperInputFilter } from "./constantes.js";
import { displayRecipes, noRecipesMatch } from "./displayFunctions.js";
import { recipes } from "./recipes.js";
import { getIngredients } from "./searchFunctions.js";

export const selectIngredient = () => {
    // Ouverture du select au click
    filterIngredientSelect.addEventListener('click', (e) => {
        const labelInput = filterIngredientSelect.querySelector('.labelInput');
        labelInput.style.display = 'none';
        wrapperInputFilter.style.display = 'flex';
    });
    // Affichage de tous les ingrédients
    const ingredients = getIngredients(recipes);
    ingredients.forEach(ingredient => {
        listItems.innerHTML+=`<li><div class='keyword'>${ingredient.name}</div></li>`
    });
    // Au click sur un bouton, on l'ajoute en tant que Tag
    const keyword = document.querySelectorAll('.keyword')
    let tagList = [];
    keyword.forEach((keywordItem) => {
        keywordItem.addEventListener('click', () => {
            let newTag = keywordItem.innerHTML;
            let recipesFilterByTags = recipes;

            // Affichage des tags
            const displayTags = () => {
                const wrapperTags = document.getElementById('wrapperTags');
                if (tagList.length) {
                    wrapperTags.innerHTML = ``;
                    tagList.forEach(tag => {
                        wrapperTags.innerHTML += `<div class='tags'>${tag}<img class='closeTag' src="./images/close.svg" alt=""></div>`;
                    });
                }
            }

            // Filtre des recettes selon les Tags Ingrédients
            const filterRecipesByTagsTypeIngredient = () => {
                const resultIngredient = recipesFilterByTags.filter(recipe => {
                    const ingredientList = recipe.ingredients.map(item => item.ingredient);
                    const filter = tagList.filter(tag => ingredientList.includes(tag))
                    return filter.length === tagList.length;
                });
                recipesFilterByTags = resultIngredient;
                // Si array.length = 0 => message d'erreur, sinon affichage des recettes filtrées
                !recipesFilterByTags.length?noRecipesMatch():displayRecipes(resultIngredient)
                // Affichage des ingrédients filtrés par recettes restantes
                const displayIngredients = (array) => {
                    listItems.innerHTML=``;
                    const ingredientsByTag = getIngredients(array);
                    ingredientsByTag.forEach(ingredient => {
                        listItems.innerHTML+=`<li><div class='keyword'>${ingredient.name}</div></li>`
                    });
                    // On remet le listener et la fonction addTag sur les nouveaux keywords
                    const keyword = document.querySelectorAll('.keyword')
                    keyword.forEach((keywordItem) => {
                        keywordItem.addEventListener('click', () => {
                            let newTag = keywordItem.innerHTML;
                            addTag(newTag)
                        })
                    })
                }
                displayIngredients(resultIngredient);
                
                
            }
            
            const addTag = (newTag) => {
                tagList.push(newTag);
                tagList = Array.from(new Set (tagList))
                console.log(tagList)
                displayTags();
                filterRecipesByTagsTypeIngredient();
                
            }
            addTag(newTag)

            
            const closeTag = document.querySelectorAll('.closeTag')
            const eraseTag = (item) => {
            console.log(item)                
                
            }
            closeTag.forEach((btnClose) => {
                btnClose.addEventListener('click', () => {
                    let currentTag = btnClose.previousSibling;
                    eraseTag(currentTag);
                } )
            })
        })
    })
}