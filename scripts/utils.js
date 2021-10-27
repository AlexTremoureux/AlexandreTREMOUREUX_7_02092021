/* eslint-disable consistent-return */
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
export const comparaison = (mot, input) => {
  for (let i = 0; i < input.length; i += 1) {
    const element = input[i]
    if (element !== mot[i]) {
      return false
    }
  }
  return true
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
