import { recipes } from './recipes.js'
import {
  getAppliance,
  getIngredients,
  getUstensils,
} from './searchFunctions.js'

// Constantes
export const search = document.getElementById('multiple-search')
export const wrapper = document.getElementById('wrapper')
export const inputTagIngredients = document.getElementById('inputIngredients')
export const inputTagDevices = document.getElementById('inputDevices')
export const inputTagUstensils = document.getElementById('inputUstensils')
export const filterIngredientSelect = document.getElementById('ingredient')
export const filterDevicesSelect = document.getElementById('devices')
export const filterUstensilsSelect = document.getElementById('ustensils')
export const wrapperIngredientInputFilter =
  filterIngredientSelect.querySelector('.wrapperIngredientInputFilter')
export const wrapperDevicesInputFilter = filterDevicesSelect.querySelector(
  '.wrapperDevicesInputFilter'
)
export const wrapperUstensilsInputFilter = filterUstensilsSelect.querySelector(
  '.wrapperUstensilsInputFilter'
)
export const listItemsIngredients =
  filterIngredientSelect.querySelector('.listItems')
export const listItemsDevices = filterDevicesSelect.querySelector('.listItems')
export const listItemsUstensils =
  filterUstensilsSelect.querySelector('.listItems')
export const tagsArray = []
export const allIngredients = getIngredients(recipes)
export const allDevices = getAppliance(recipes)
export const allUstensils = getUstensils(recipes)
