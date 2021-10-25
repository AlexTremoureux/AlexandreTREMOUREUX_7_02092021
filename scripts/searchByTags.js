import {
  filterDevicesSelect,
  filterIngredientSelect,
  filterUstensilsSelect,
  inputTagDevices,
  inputTagIngredients,
  inputTagUstensils,
  listItemsDevices,
  listItemsIngredients,
  listItemsUstensils,
  wrapperDevicesInputFilter,
  wrapperIngredientInputFilter,
  wrapperUstensilsInputFilter,
} from './constantes.js'
import {
  close,
  displayKeyWords,
  hideOnClickOutside,
  open,
} from './displayFunctions.js'
import {
  searchDevicesFunctionTag,
  searchIngredientsFunctionTag,
  searchUstensilsFunctionTag,
} from './searchFunctions.js'
import { normalize } from './utils.js'

// Initialisation du select type ingrédients
export const selectIngredient = (arrayIngred, arrayRecipes) => {
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

  // Fonction de recherche sur l'input du select ingredients
  inputTagIngredients.addEventListener('keyup', () => {
    const inputValueToLower = normalize(inputTagIngredients.value)
    const arrayIngredFilter = searchIngredientsFunctionTag(
      inputValueToLower,
      arrayIngred
    )
    // Si moins de 3 caractères saisis, affichage des ingrédients non filtrés
    // Sinon, affichage des ingrédients filtrés selon les données saisies
    if (inputValueToLower.length < 3) {
      return displayKeyWords(
        arrayIngred,
        inputTagIngredients,
        listItemsIngredients,
        arrayRecipes
      )
    }
    return displayKeyWords(
      arrayIngredFilter,
      inputTagIngredients,
      listItemsIngredients,
      arrayRecipes
    )
  })
  displayKeyWords(
    arrayIngred,
    inputTagIngredients,
    listItemsIngredients,
    arrayRecipes
  )
}

// Initialisation du select type appareils
export const selectDevices = (arrayIngred, arrayRecipes) => {
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

  // Fonction de recherche sur l'input du select appareil
  inputTagDevices.addEventListener('keyup', () => {
    const inputValueToLower = normalize(inputTagDevices.value)
    const arrayDeviceFilter = searchDevicesFunctionTag(
      inputValueToLower,
      arrayIngred
    )
    // Si moins de 3 caractères saisis, affichage des appareils non filtrées
    // Sinon, affichage des appareils filtrées selon les données saisies
    if (inputValueToLower.length < 3) {
      return displayKeyWords(
        arrayIngred,
        inputTagDevices,
        listItemsDevices,
        arrayRecipes
      )
    }
    return displayKeyWords(
      arrayDeviceFilter,
      inputTagDevices,
      listItemsDevices,
      arrayRecipes
    )
  })
  displayKeyWords(arrayIngred, inputTagDevices, listItemsDevices, arrayRecipes)
}

// Initialisation du select type ustensiles
export const selectUstensils = (arrayIngred, arrayRecipes) => {
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
  // Fonction de recherche sur l'input du select appareil
  inputTagUstensils.addEventListener('keyup', () => {
    const inputValueToLower = normalize(inputTagUstensils.value)
    const arrayUstensFilter = searchUstensilsFunctionTag(
      inputValueToLower,
      arrayIngred
    )
    // Si moins de 3 caractères saisis, affichage des ustensiles non filtrées
    // Sinon, affichage des recettes filtrées selon les données saisies
    if (inputValueToLower.length < 3) {
      return displayKeyWords(
        arrayIngred,
        inputTagUstensils,
        listItemsUstensils,
        arrayRecipes
      )
    }
    return displayKeyWords(
      arrayUstensFilter,
      inputTagUstensils,
      listItemsUstensils,
      arrayRecipes
    )
  })
  displayKeyWords(
    arrayIngred,
    inputTagUstensils,
    listItemsUstensils,
    arrayRecipes
  )
}
