
export const transformObjectToArray = (object: any) => {
    if (!Object.keys(object).length) {
        return null;
    }
    const keys = Object.keys(object);
    const notNullArray :any[] = [];
    
    for (let i = 0; i < keys.length; i++) {
        const property = keys[i];
        if (object[property]) {
            notNullArray.push({[property]: object[property]});
        }
        
    }
    return notNullArray.length ? notNullArray : null;
}
 