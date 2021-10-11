import { allDevices, allIngredients, allUstensils, filterDevicesSelect, filterIngredientSelect, filterUstensilsSelect, inputTagDevices, inputTagIngredients, inputTagUstensils, wrapperDevicesInputFilter, wrapperIngredientInputFilter, wrapperUstensilsInputFilter } from "./constantes.js";
import { close, displayDevices, displayIngredients, displayUstensils, hideOnClickOutside, open } from "./displayFunctions.js";
import { searchDevicesFunctionTag, searchIngredientsFunctionTag, searchUstensilsFunctionTag } from "./searchFunctions.js";


// Initialisation du select type ingrédients
export const selectIngredient = () => {
  const labelInput = filterIngredientSelect.querySelector('.labelInput_ingredients');
  const closeIngredients = document.getElementById('closeIngredients');
  const iconDropDown = filterIngredientSelect.querySelector('.iconDropDown');
  // Ouverture du select au click
  labelInput.addEventListener('click', (e) => {
    open(wrapperIngredientInputFilter, labelInput, iconDropDown);
  });
  // Gestion du click sur iconDropDown
  closeIngredients.addEventListener('click', (e) => {
    if(iconDropDown.className.includes('up')) {
      close(labelInput, wrapperIngredientInputFilter, iconDropDown);
    } else {
      open(wrapperIngredientInputFilter, labelInput, iconDropDown);
    };
  });
  // Gestion du click en dehors du dropdown
  hideOnClickOutside(filterIngredientSelect, labelInput, iconDropDown);
  // Gestion de la touche echap
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close(labelInput, wrapperIngredientInputFilter, iconDropDown);
    }
  }
  document.addEventListener('keydown', onKeyUp);
  // Fonction de recherche sur l'input du select ingredients
  inputTagIngredients.addEventListener('keyup', () => {
    searchIngredientsFunctionTag();
  });
  // Affichage de tous les ingrédients
  displayIngredients(allIngredients);
};

// Initialisation du select type appareils
export const selectDevices = () => {
  const iconDropDown = filterDevicesSelect.querySelector('.iconDropDown');
  const closeDevices = document.getElementById('closeDevices');
  const labelInput = filterDevicesSelect.querySelector('.labelInput_devices');
  // Ouverture du select au click
  labelInput.addEventListener('click', (e) => {
    open(wrapperDevicesInputFilter, labelInput, iconDropDown);
  });
  // Gestion du click sur iconDropDown
  closeDevices.addEventListener('click', (e) => {
    if(iconDropDown.className.includes('up')) {
      close(labelInput, wrapperDevicesInputFilter, iconDropDown);
    } else {
      open(wrapperDevicesInputFilter, labelInput, iconDropDown);
    };
  });
  //Gestion du click en dehors du dropdown
  hideOnClickOutside(filterDevicesSelect, labelInput, iconDropDown);
  // Gestion de la touche echap
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close(labelInput, wrapperDevicesInputFilter, iconDropDown);
    }
  }
  document.addEventListener('keydown', onKeyUp);
  // Fonction de recherche sur l'input du select appareil
  inputTagDevices.addEventListener('keyup', () => {
    searchDevicesFunctionTag();
  });
  // Affichage de tous les appareils
    displayDevices(allDevices);
};

// Initialisation du select type ustensiles
export const selectUstensils = () => {
  const iconDropDown = filterUstensilsSelect.querySelector('.iconDropDown');
  const closeUstensils = document.getElementById('closeUstensils');
  const labelInput = filterUstensilsSelect.querySelector('.labelInput_ustensils');
  // Ouverture du select au click
  labelInput.addEventListener('click', (e) => {
    open(wrapperUstensilsInputFilter, labelInput, iconDropDown);
  });
  // Gestion du click sur iconDropDown
  closeUstensils.addEventListener('click', (e) => {
    if(iconDropDown.className.includes('up')) {
      close(labelInput, wrapperUstensilsInputFilter, iconDropDown);
    } else {
      open(wrapperUstensilsInputFilter, labelInput, iconDropDown);
    };
  });
  //Gestion du click en dehors du dropdown
  hideOnClickOutside(filterUstensilsSelect, labelInput, iconDropDown);
  // Gestion de la touche echap
  const onKeyUp = (e) => {
    if (e.key === 'Escape') {
      close(labelInput, wrapperUstensilsInputFilter, iconDropDown);
    }
  }
  document.addEventListener('keydown', onKeyUp);
  // Fonction de recherche sur l'input du select appareil
  inputTagUstensils.addEventListener('keyup', () => {
    searchUstensilsFunctionTag();
  });
  // Affichage de tous les appareils
    displayUstensils(allUstensils);
};









