/* eslint-disable consistent-return */

// Utilisation de NFD la forme normale Unicode décompose les graphèmes combinés en une combinaison de graphèmes simples. Le è de Crème finit par s'exprimer par e + ` .
// classe de caractères regex pour correspondre à la plage U+0300 → U+036F remplacée par ''
export const normalize = (string) => {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export const isInTheArray = (currentId, array) => {
  for (let i = 0; i < array.length; i += 1) {
    const element = array[i]
    if (element.id === currentId) {
      return true
    }
  }
}

/**
 *
 * @param {string} mot
 * @param {string} input
 * @returns Boolean
 */
// Comparaison de chaque lettre de l'input avec chaque lettre du mot à comparer
export const comparaison = (mot, input) => {
  for (let i = 0; i < input.length; i += 1) {
    const element = input[i]
    if (element !== mot[i]) {
      return false
    }
  }
  return true
}

// La méthode charAt() renvoie une nouvelle chaîne contenant le caractère à la position indiquée en argument.
// La méthode slice() renvoie une copie de la chaîne de départ de laquelle on a extrait une portion indiquée par l'index de début d'extraction
export function capitalizeFirstLetter(string) {
  console.log(string.slice(1))
  return string.charAt(0).toUpperCase() + string.slice(1)
}
