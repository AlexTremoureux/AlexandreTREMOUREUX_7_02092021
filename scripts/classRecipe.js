import { wrapper } from "./constantes.js";

export class Recipe {
    constructor(title, time, ingredients, description) {
      this.element = this.buildDom(title, time, description);
      this.title = title;
      this.time = time;
      this.ingredients = ingredients;
      this.description = description;
      this.addIngredients(ingredients)
    }
    // Affichage du titre de la recette, sa durée et sa description
    buildDom(title, time, description) {
      this.title = title;
      this.time = time;
      this.description = description;
      const dom = document.createElement('article');
      dom.classList.add('container');
      wrapper.appendChild(dom);
      const illustration = document.createElement('div');
      illustration.classList.add('illustration');
      dom.appendChild(illustration);
      const recipeItem = document.createElement('div');
      recipeItem.classList.add('recipeItem');
      dom.appendChild(recipeItem);
      recipeItem.innerHTML = "";
      recipeItem.innerHTML += `
        <div class="head">
        <h2 class="title">${this.title}</h2>
        <p class="time">${this.time} min</p>
        </div>
        <div class="contenu">
          <ul class="ingredients">
          </ul>
          <p class="description">
            ${this.description}
          </p>
        </div>
        `
      return dom
    }
    // Affichage des ingrédients et des quantitées
    addIngredients(ingredients) {
      this.ingredients = ingredients;
      const domIngredients = this.element.querySelector('.ingredients')
      this.ingredients.forEach(ingred => {
        const domListeIngredients = document.createElement('li');
      domIngredients.appendChild(domListeIngredients);
        domListeIngredients.innerHTML += `
        <p><h3>${ingred.ingredient}</h3><span>
        ${ingred.quantity?": "+ingred.quantity : ''}
        ${ingred.quantite?": "+ingred.quantite : ''}
        ${ingred.unit?ingred.unit :''}
        </span></p>`
      })
  
    }
  }