import { allDevices, allIngredients, allUstensils, filterDevicesSelect, filterIngredientSelect, filterUstensilsSelect, inputTagDevices, inputTagIngredients, inputTagUstensils, wrapperDevicesInputFilter, wrapperIngredientInputFilter, wrapperUstensilsInputFilter } from "./constantes.js";
import { displayDevices, displayIngredients, displayUstensils } from "./displayFunctions.js";
import { searchDevicesFunctionTag, searchIngredientsFunctionTag, searchUstensilsFunctionTag } from "./searchFunctions.js";

// Initialisation du select type ingrédients
export const selectIngredient = () => {
    // Ouverture du select au click
    filterIngredientSelect.addEventListener('click', (e) => {
        const labelInput = filterIngredientSelect.querySelector('.labelInput_ingredients');
        labelInput.style.display = 'none';
        wrapperIngredientInputFilter.style.display = 'flex';
    });
    // Fonction de recherche sur l'input du select ingredients
    inputTagIngredients.addEventListener('keyup', () => {
      searchIngredientsFunctionTag();
    })
    // Affichage de tous les ingrédients
    displayIngredients(allIngredients)
}

// Initialisation du select type appareils
export const selectDevices = () => {
  // Ouverture du select au click
  filterDevicesSelect.addEventListener('click', (e) => {
      const labelInput = filterDevicesSelect.querySelector('.labelInput_devices');
      labelInput.style.display = 'none';
      wrapperDevicesInputFilter.style.display = 'flex';
  });
  // Fonction de recherche sur l'input du select appareil
  inputTagDevices.addEventListener('keyup', () => {
    searchDevicesFunctionTag();
  })
  // Affichage de tous les appareils
    displayDevices(allDevices)
}

// Initialisation du select type ustensiles
export const selectUstensils = () => {
  // Ouverture du select au click
  filterUstensilsSelect.addEventListener('click', (e) => {
      const labelInput = filterUstensilsSelect.querySelector('.labelInput_ustensils');
      labelInput.style.display = 'none';
      wrapperUstensilsInputFilter.style.display = 'flex';
  });
  // Fonction de recherche sur l'input du select appareil
  inputTagUstensils.addEventListener('keyup', () => {
    searchUstensilsFunctionTag();
  })
  // Affichage de tous les appareils
    displayUstensils(allUstensils)
}