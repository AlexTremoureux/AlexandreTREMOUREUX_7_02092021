/* eslint-disable no-unused-vars */

import { Recipe } from './classRecipe.js'
import { Tags } from './classTags.js'
import {
  filterDevicesSelect,
  filterIngredientSelect,
  filterUstensilsSelect,
  wrapper,
  wrapperDevicesInputFilter,
  wrapperIngredientInputFilter,
  wrapperUstensilsInputFilter,
} from './constantes.js'
import {
  selectDevices,
  selectIngredient,
  selectUstensils,
} from './searchByTags.js'
import {
  getAppliance,
  getIngredients,
  getUstensils,
} from './searchFunctions.js'

// Si aucun résultat ne match, affichage d'un message avec suggestion de recherche
export const noRecipesMatch = () => {
  wrapper.innerHTML = ''
  wrapper.innerHTML += `
      <p class="noResult">Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`
}
// Affichage des recettes à partir d'un array
export const displayRecipes = (array) => {
  wrapper.innerHTML = ''
  array.forEach((recipe) => {
    recipe = new Recipe(
      recipe.name,
      recipe.time,
      recipe.ingredients,
      recipe.description
    )
  })
}

// Affichage des ingrédients dans le select
export const displayKeyWords = (arrayKeyword, input, dest, arrayRecipe) => {
  const tags = new Tags()
  dest.innerHTML = ``
  arrayKeyword.forEach((ingredient) => {
    dest.innerHTML += `<li><div class='keyword'>${ingredient.name}</div></li>`
  })
  // Ajout d'un listener sur les nouveaux keywords et on les ajoutes en tant que tag
  const keyword = document.querySelectorAll('.keyword')
  keyword.forEach((keywordItem) => {
    keywordItem.addEventListener('click', () => {
      const newTag = keywordItem.innerHTML
      input.value = ''
      tags.addTag(newTag, arrayRecipe)
    })
  })
}
// Initialisation des dropdowns et affaichage des keywords en fonction de l'array défini
export const initSelect = (array) => {
  selectIngredient(array)
  selectDevices(array)
  selectUstensils(array)
}
// Ouverture du dropdown
export const open = (visible, hidden, icon) => {
  hidden.style.display = 'none'
  visible.style.display = 'flex'
  icon.classList.add('up')
}
// fermeture du dropdown
export const close = (visible, hidden, icon) => {
  visible.style.display = 'block'
  hidden.style.display = 'none'
  icon.classList.remove('up')
}
// Gestion du click en dehors des dropdowns
export function hideOnClickOutside(elementHidden, elementVisible, icon) {
  const outsideClickListener = (event) => {
    if (
      !elementHidden.contains(event.target) &&
      icon.className.includes('up')
    ) {
      elementHidden.lastElementChild.style.display = 'none'
      elementVisible.style.display = 'block'
      icon.classList.remove('up')
    }
  }
  document.addEventListener('click', outsideClickListener)
}

export const eventClickOnSelectIngredients = () => {
  const labelInput = filterIngredientSelect.querySelector(
    '.labelInput_ingredients'
  )
  const closeIngredients = document.getElementById('closeIngredients')
  const iconDropDown = filterIngredientSelect.querySelector('.iconDropDown')
  // Ouverture du select au click
  labelInput.addEventListener('click', () => {
    open(wrapperIngredientInputFilter, labelInput, iconDropDown)
  })
  // Gestion du click sur iconDropDown
  closeIngredients.addEventListener('click', () => {
    if (iconDropDown.className.includes('up')) {
      close(labelInput, wrapperIngredientInputFilter, iconDropDown)
    } else {
      open(wrapperIngredientInputFilter, labelInput, iconDropDown)
    }
  })
  // Gestion du click en dehors du dropdown
  hideOnClickOutside(filterIngredientSelect, labelInput, iconDropDown)
  // Gestion de la touche echap
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close(labelInput, wrapperIngredientInputFilter, iconDropDown)
    }
  }
  document.addEventListener('keydown', onKeyUp)
}

export const eventClickOnSelectDevices = () => {
  const iconDropDown = filterDevicesSelect.querySelector('.iconDropDown')
  const closeDevices = document.getElementById('closeDevices')
  const labelInput = filterDevicesSelect.querySelector('.labelInput_devices')
  // Ouverture du select au click
  labelInput.addEventListener('click', () => {
    open(wrapperDevicesInputFilter, labelInput, iconDropDown)
  })
  // Gestion du click sur iconDropDown
  closeDevices.addEventListener('click', () => {
    if (iconDropDown.className.includes('up')) {
      close(labelInput, wrapperDevicesInputFilter, iconDropDown)
    } else {
      open(wrapperDevicesInputFilter, labelInput, iconDropDown)
    }
  })
  // Gestion du click en dehors du dropdown
  hideOnClickOutside(filterDevicesSelect, labelInput, iconDropDown)
  // Gestion de la touche echap
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close(labelInput, wrapperDevicesInputFilter, iconDropDown)
    }
  }
  document.addEventListener('keydown', onKeyUp)
}

export const eventClickOnSelectUstensils = () => {
  const iconDropDown = filterUstensilsSelect.querySelector('.iconDropDown')
  const closeUstensils = document.getElementById('closeUstensils')
  const labelInput = filterUstensilsSelect.querySelector(
    '.labelInput_ustensils'
  )
  // Ouverture du select au click
  labelInput.addEventListener('click', () => {
    open(wrapperUstensilsInputFilter, labelInput, iconDropDown)
  })
  // Gestion du click sur iconDropDown
  closeUstensils.addEventListener('click', () => {
    if (iconDropDown.className.includes('up')) {
      close(labelInput, wrapperUstensilsInputFilter, iconDropDown)
    } else {
      open(wrapperUstensilsInputFilter, labelInput, iconDropDown)
    }
  })
  // Gestion du click en dehors du dropdown
  hideOnClickOutside(filterUstensilsSelect, labelInput, iconDropDown)
  // Gestion de la touche echap
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close(labelInput, wrapperUstensilsInputFilter, iconDropDown)
    }
  }
  document.addEventListener('keydown', onKeyUp)
}
