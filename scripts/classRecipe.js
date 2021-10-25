// eslint-disable-next-line import/extensions
import { wrapper } from './constantes.js'

// Class Recette de cuisine
export class Recipe {
  constructor(title, time, ingredients, description) {
    this.element = this.buildDom(title, time, description)
    this.title = title
    this.time = time
    this.ingredients = ingredients
    this.description = description
    this.addIngredients(ingredients)
  }

  // Construction de DOM et affichage du titre / durée / description de la recette.
  buildDom(title, time, description) {
    this.title = title
    this.time = time
    this.description = description
    const dom = document.createElement('article')
    dom.classList.add('container')
    wrapper.appendChild(dom)
    const illustration = document.createElement('div')
    illustration.classList.add('illustration')
    dom.appendChild(illustration)
    const recipeItem = document.createElement('div')
    recipeItem.classList.add('recipeItem')
    dom.appendChild(recipeItem)
    recipeItem.innerHTML = ''
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
    this.ingredients = ingredients
    const domIngredients = this.element.querySelector('.ingredients')
    this.ingredients.forEach((ingred) => {
      const domListeIngredients = document.createElement('li')
      domIngredients.appendChild(domListeIngredients)
      const quantity = ingred.quantity || ingred.quantite
      // const unity = ingred.unit.replace('grammes','g')
      if (quantity) {
        domListeIngredients.innerHTML += `
          <p><h3>${ingred.ingredient} :</h3><span class="quantity">
          ${quantity} ${
          ingred.unit
            ? ingred.unit
                .replace('grammes', 'g')
                .replace('cuillère à soupe', 'c. à soupe')
                .replace('cuillères à soupe', 'c. à soupe')
                .replace('cuillères à café', 'c. à café')
            : ''
        }
          </span></p>`
      }
    })
  }
}
