import { displayRecipes, noRecipesMatch } from './displayFunctions.js';
import { getAppliance, getIngredients, getUstensils } from './searchFunctions.js';
import { allDevices, allIngredients, listItemsDevices, listItemsIngredients, listItemsUstensils } from './constantes.js';

export class Tags {
tagList = [];
recipesFilterByTags = [];
    // Affichage du tag
    displayTags = (arrayRecipe) => {
        const wrapperTags = document.getElementById('wrapperTags');
        wrapperTags.innerHTML = ``;
        if (this.tagList.length) {
            this.tagList.forEach(tag => {
                const color = this.typeOfTag(tag)
                wrapperTags.innerHTML += `<div class='tags ${color}'>${tag}<img class='closeTag' src="./images/close.svg" alt=""></div>`;
            });
            const closeTag = document.querySelectorAll('.closeTag')
            closeTag.forEach((btnClose) => {
                btnClose.addEventListener('click', () => {
                    const currentTag = btnClose.previousSibling.textContent
                    this.deleteTag(currentTag, arrayRecipe)
                })
            })
        }
    }
    // Affichage des recettes triées par tags
    filterRecipesByTags = (arrayRecipe) => {
        //this.recipesFilterByTags = recipes;
        this.recipesFilterByTags = arrayRecipe
        const result = this.recipesFilterByTags.filter(recipe => {
            const ingredientList = recipe.ingredients.map(item => item.ingredient);
            const deviceList = [recipe.appliance.toLowerCase()];
            const ustensilList = recipe.ustensils.map(ustens => ustens.toLowerCase());
            // ajoute dans un tableau les tags présents dans tagList si ils sont trouvés dans une recette
            const filter = this.tagList.filter(tag => [...ingredientList, ...deviceList, ...ustensilList].includes(tag))
            // Si le nombre de tags est le même dans les deux tableaux, on return true et la recette est rajoutée au tableau
            const resultFilter = filter.length === this.tagList.length;
            return resultFilter
        });
        this.recipesFilterByTags = result;
        this.displayIngredients(this.recipesFilterByTags, arrayRecipe)
        this.displayDevice(this.recipesFilterByTags, arrayRecipe)
        this.displayUstensils(this.recipesFilterByTags, arrayRecipe)
        return !this.recipesFilterByTags.length ? noRecipesMatch() : displayRecipes(this.recipesFilterByTags);
    }
    
    addTag = (newTag, arrayRecipe) => {
        this.tagList.push(newTag);
        this.tagList = Array.from(new Set (this.tagList))
        this.typeOfTag(newTag)
        this.displayTags(arrayRecipe);
        this.filterRecipesByTags(arrayRecipe);
    }
    // Suppression du tag au click sur l'icone de fermeture
    deleteTag = (tag, arrayRecipe) => {
        this.tagList = this.tagList.filter(item => item !== tag);
        this.displayTags(arrayRecipe);
        this.filterRecipesByTags(arrayRecipe);
    }
    // On détermine le type de tag afin de lui attribuer la bonne couleur
    typeOfTag = (tag) => {
        const ingred = allIngredients.map(ingre => ingre.name.includes(tag))
        const isIngred = ingred.includes(true)
        const device = allDevices.map(dev => dev.name.includes(tag))
        const isDevices = device.includes(true)
        let color = '';
        return isIngred ? color = "blue" : isDevices ? color = "green" : color = "red";
    }
    // Affichage des ingédients dans le select
    displayIngredients = (array, arrayRecipe) => {
        listItemsIngredients.innerHTML=``;
        const ingredientsByTag = getIngredients(array);
        ingredientsByTag.forEach(ingredient => {
            listItemsIngredients.innerHTML+=`<li><div class='keyword'>${ingredient.name}</div></li>`
        });
        // On remet le listener et la fonction addTag sur les nouveaux keywords
        const keyword = document.querySelectorAll('.keyword')
        keyword.forEach((keywordItem) => {
            keywordItem.addEventListener('click', () => {
                let newTag = keywordItem.innerHTML;
                this.addTag(newTag,arrayRecipe)
            })
        })
    }
    // Affichage des ingrédients dans le select
    displayDevice = (array, arrayRecipe) => {
        listItemsDevices.innerHTML=``;
        const deviceByTag = getAppliance(array);
        deviceByTag.forEach(device => {
            listItemsDevices.innerHTML+=`<li><div class='keyword'>${device.name}</div></li>`
        });
        // On remet le listener et la fonction addTag sur les nouveaux keywords
        const keyword = document.querySelectorAll('.keyword')
        keyword.forEach((keywordItem) => {
            keywordItem.addEventListener('click', () => {
                let newTag = keywordItem.innerHTML;
                this.addTag(newTag, arrayRecipe)
            })
        })
    }
    // Affichage des ustensiles dans le select
    displayUstensils = (array, arrayRecipe) => {
        listItemsUstensils.innerHTML=``;
        const ustensilByTag = getUstensils(array);
        ustensilByTag.forEach(ustensil => {
        listItemsUstensils.innerHTML+=`<li><div class='keyword'>${ustensil.name}</div></li>`
        });
        // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
        const keyword = document.querySelectorAll('.keyword')
        keyword.forEach((keywordItem) => {
            keywordItem.addEventListener('click', () => {
                let newTag = keywordItem.innerHTML;
                this.addTag(newTag, arrayRecipe)
            })
        })
    }
}