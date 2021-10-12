export const normalize = (value) => {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};
export const isInTheArray = (currentId, array) => {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.id === currentId) {
            return true;
        };
    };
};
export const comparaison = (mot, input) => {
    for (let i = 0; i < input.length; i++) {
        const element = input[i];
        if (element !== mot[i]) {
            return false;
        };
    };
    return true;
};;