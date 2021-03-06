import { displayRecipes, noRecipesMatch } from './displayFunctions.js'
import {
  getAppliance,
  getIngredients,
  getUstensils,
  searchDevicesFunctionTag,
  searchIngredientsFunctionTag,
  searchUstensilsFunctionTag,
} from './searchFunctions.js'
import {
  allDevices,
  allIngredients,
  inputTagDevices,
  inputTagIngredients,
  inputTagUstensils,
  listItemsDevices,
  listItemsIngredients,
  listItemsUstensils,
} from './constantes.js'
import { normalize } from './utils.js'

export class Tags {
  // Array de tags
  tagList = []
  // Nouvel array de recette filtrée par tags
  recipesFilterByTags = []

  // Affichage du tag
  displayTags = (arrayPreFilter) => {
    // Réinitialisation du container de tags
    const wrapperTags = document.getElementById('wrapperTags')
    wrapperTags.innerHTML = ``
    // On s'assure que l'array de tag ne soit pas vide
    if (this.tagList.length) {
      this.tagList.forEach((tag) => {
        // On attribue une couleur au tag selon sa catégorie
        const color = this.typeOfTag(tag)
        wrapperTags.innerHTML += `<div class='tags ${color}'>${tag}<img class='closeTag' src="./images/close.svg" alt=""></div>`
      })
      // Effacement du tag au click sur l'icone de fermeture
      const closeTag = document.querySelectorAll('.closeTag')
      closeTag.forEach((btnClose) => {
        btnClose.addEventListener('click', () => {
          const currentTag = btnClose.previousSibling.textContent
          this.deleteTag(currentTag, arrayPreFilter)
        })
      })
    }
  }

  // Affichage des recettes triées par tags
  filterRecipesByTags = (arrayPreFilter) => {
    this.recipesFilterByTags = arrayPreFilter
    const result = this.recipesFilterByTags.filter((recipe) => {
      // On vient chercher les ingrédients, appareils et ustensiles présents dans la recette
      const ingredientList = recipe.ingredients.map((item) =>
        normalize(item.ingredient)
      )
      const deviceList = [normalize(recipe.appliance)]
      const ustensilList = recipe.ustensils.map((ustens) => normalize(ustens))
      // On crée un nouveau tableau contenants les ingrédients/ appareils/ ustensiles présent dans la recette et présents dans tagList
      const filter = this.tagList.filter((tag) =>
        [...ingredientList, ...deviceList, ...ustensilList].includes(
          normalize(tag)
        )
      )
      // Si le nombre de tags est le même dans les deux tableaux, on return true et la recette est conservée dans le tableau de filtre
      const resultFilter = filter.length === this.tagList.length
      return resultFilter
    })
    this.recipesFilterByTags = result
    this.selectIngredient(this.recipesFilterByTags, arrayPreFilter)
    this.selectDevices(this.recipesFilterByTags, arrayPreFilter)
    this.selectUstensils(this.recipesFilterByTags, arrayPreFilter)
    // Si l'array est vide, on retourne un message d'erreur, sinon on affiche les recettes de l'array
    return !this.recipesFilterByTags.length
      ? noRecipesMatch()
      : displayRecipes(this.recipesFilterByTags)
  }
  // Méthode de départ qui ajoute le mot clé aui a été cliqué à la liste de tags
  addTag = (newTag, arrayPreFilter) => {
    this.tagList.push(newTag)
    this.tagList = Array.from(new Set(this.tagList))
    this.typeOfTag(newTag)
    this.displayTags(arrayPreFilter)
    this.filterRecipesByTags(arrayPreFilter)
  }
  // Suppression du tag de tagList , réaffichage des tags et refiltre 
  deleteTag = (tag, arrayPreFilter) => {
    this.tagList = this.tagList.filter((item) => item !== tag)
    this.displayTags(arrayPreFilter)
    this.filterRecipesByTags(arrayPreFilter)
  }
  // On détermine le type de tag afin de lui attribuer la bonne couleur
  typeOfTag = (tag) => {
    const ingred = allIngredients.map((ingre) => ingre.name.includes(tag))
    const isIngred = ingred.includes(true)
    const device = allDevices.map((dev) => dev.name.includes(tag))
    const isDevices = device.includes(true)
    let color = ''
    return isIngred
      ? (color = 'blue')
      : isDevices
      ? (color = 'green')
      : (color = 'red')
  }
  // Affichage des ingédients dans le select
  displayIngredients = (arrayIngredients, arrayPreFilter) => {
    listItemsIngredients.innerHTML = ``
    arrayIngredients.forEach((ingredient) => {
      listItemsIngredients.innerHTML += `<li><div class='keyword'>${ingredient.name}</div></li>`
    })
    // On remet le listener et la méthode addTag sur les nouveaux keywords
    const keyword = document.querySelectorAll('.keyword')
    keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
        let newTag = keywordItem.innerHTML
        inputTagIngredients.value = ''
        this.addTag(newTag, arrayPreFilter)
      })
    })
  }
  // Affichage des ingrédients dans le select
  displayDevice = (arrayDevices, arrayPreFilter) => {
    listItemsDevices.innerHTML = ``
    arrayDevices.forEach((device) => {
      listItemsDevices.innerHTML += `<li><div class='keyword'>${device.name}</div></li>`
    })
    // On remet le listener et la fonction addTag sur les nouveaux keywords
    const keyword = document.querySelectorAll('.keyword')
    keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
        let newTag = keywordItem.innerHTML
        inputTagDevices.value = ''
        this.addTag(newTag, arrayPreFilter)
      })
    })
  }
  // Affichage des ustensiles dans le select
  displayUstensils = (arrayUstensils, arrayPreFilter) => {
    listItemsUstensils.innerHTML = ``
    arrayUstensils.forEach((ustensil) => {
      listItemsUstensils.innerHTML += `<li><div class='keyword'>${ustensil.name}</div></li>`
    })
    // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
    const keyword = document.querySelectorAll('.keyword')
    keyword.forEach((keywordItem) => {
      keywordItem.addEventListener('click', () => {
        let newTag = keywordItem.innerHTML
        inputTagUstensils.value = ''
        this.addTag(newTag, arrayPreFilter)
      })
    })
  }
  selectIngredient = (arrayFilterByTag, arrayPreFilter) => {
    const arrayIngred = getIngredients(arrayFilterByTag)
    // Fonction de recherche sur l'input du select ingredients
    inputTagIngredients.addEventListener('keyup', () => {
      const inputValueToLower = normalize(inputTagIngredients.value)
      // Si moins de 3 caractères saisis, affichage des ingrédients non filtrés
      if (inputValueToLower.length < 3) {
        return this.displayIngredients(arrayIngred, arrayPreFilter)
      }
      // Sinon, affichage des ingrédients filtrés selon les données saisies
      const arrayIngredFilter = searchIngredientsFunctionTag(
        inputValueToLower,
        arrayFilterByTag
      )
      return this.displayIngredients(arrayIngredFilter, arrayPreFilter)
    })
    this.displayIngredients(arrayIngred, arrayPreFilter)
  }

  selectDevices = (arrayFilterByTag, arrayPreFilter) => {
    const arrayDevice = getAppliance(arrayFilterByTag)
    // Fonction de recherche sur l'input du select appareil
    inputTagDevices.addEventListener('keyup', () => {
      const inputValueToLower = normalize(inputTagDevices.value)
      // Si moins de 3 caractères saisis, affichage des appareils non filtrées
      // Sinon, affichage des appareils filtrées selon les données saisies
      if (inputValueToLower.length < 3) {
        return this.displayDevice(arrayDevice, arrayPreFilter)
      }
      const arrayDeviceFilter = searchDevicesFunctionTag(
        inputValueToLower,
        arrayFilterByTag
      )
      return this.displayDevice(arrayDeviceFilter, arrayPreFilter)
    })
    this.displayDevice(arrayDevice, arrayPreFilter)
  }

  selectUstensils = (arrayFilterByTag, arrayPreFilter) => {
    const arrayUstensils = getUstensils(arrayFilterByTag)
    // Fonction de recherche sur l'input du select appareil
    inputTagUstensils.addEventListener('keyup', () => {
      const inputValueToLower = normalize(inputTagUstensils.value)

      // Si moins de 3 caractères saisis, affichage des ustensiles non filtrées
      // Sinon, affichage des recettes filtrées selon les données saisies
      if (inputValueToLower.length < 3) {
        return this.displayUstensils(arrayUstensils, arrayPreFilter)
      }
      const arrayUstensFilter = searchUstensilsFunctionTag(
        inputValueToLower,
        arrayFilterByTag
      )
      // const arrayRecipeUstensFilter = arrayFilterByTag.filter(recipe => recipe.ustensils.map((liste) => normalize(liste)).includes(inputValueToLower))
      return this.displayUstensils(arrayUstensFilter, arrayPreFilter)
    })
    this.displayUstensils(arrayUstensils, arrayPreFilter)
  }
}
