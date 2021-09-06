import {recipes} from './recipes.js'
console.log(recipes)

const search = document.getElementById('multiple-search')
const wrapper = document.getElementById('wrapper')

class Recipe {
  
  constructor(title, time, ingredients, description) {
    this.element = this.buildDom(title, time, ingredients, description);
    this.title = title;
    this.time = time;
    this.ingredients = ingredients;
    this.description = description;
  }
  buildDom(title, time, ingredients, description) {
    this.title = title;
    this.time = time;
    this.ingredients = ingredients;
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
          <li>${this.ingredients}</li>
        </ul>
        <p class="decription">${this.description}</p>
      </div>
      `
    return dom
  }
}


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

// Suggestion de recherche
const suggest = document.getElementById('suggestion');
const displaySuggest = (category) => {
  
  category.forEach(resultItem => {
    let listeIngredients = [];
    suggest.innerHTML += `
    <li>
      <a>${resultItem.name}</a>
    </li>`
    resultItem.ingredients.forEach((liste) => {
      listeIngredients.push(liste.ingredient);
    })
    resultItem = new Recipe(resultItem.name,resultItem.time,listeIngredients,resultItem.description)
    console.log(resultItem.description)
  })
}

// Listener sur l'input
search.addEventListener('keyup', () => {
  const arrayInput = search.value.toLowerCase();
  const resultName = recipes.filter(item => item.name.toLowerCase().includes(arrayInput));
  const resultDescription = recipes.filter(item => item.description.toLowerCase().includes(arrayInput));
  const resultIngredient = recipes.forEach(item => item.ingredients.filter(item => item.ingredient.toLowerCase().includes(arrayInput)))
  
  if (arrayInput.length <= 2) {
    suggest.innerHTML = '';
    wrapper.innerHTML = '';
    suggest.style.display='none';
  }
  if (arrayInput.length > 2) {
    suggest.style.display='flex';
    suggest.innerHTML = '';
    wrapper.innerHTML = '';
    displaySuggest(resultName)
    displaySuggest(resultDescription)
    //displaySuggest(resultIngredient)
    console.log(resultIngredient)
   }
})


    



