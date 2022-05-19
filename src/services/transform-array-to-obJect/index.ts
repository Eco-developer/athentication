export const transformArrayToObject = (array: any[]) => {
    if (!array.length) {
        return null;
    }
    const object:any = {};
    for (let i = 0; i < array.length; i++) {
        const property = Object.keys(array[i])[0];
        object[property] = array[i][property];
    }
    return object;
}