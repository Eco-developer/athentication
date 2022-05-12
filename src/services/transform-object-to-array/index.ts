import { EditablePropertiesInterface } from "../../interfaces";
import { keys } from "../../const";

export const transformObjectToArray = (object: EditablePropertiesInterface) => {
    if (!Object.keys(object).length) {
        return null;
    }
    const notNullArray :EditablePropertiesInterface[] = [];
    
    for (let i = 0; i < keys.length; i++) {
        const property = keys[i];
        if (object[property]) {
            notNullArray.push({[property]: object[property]});
        }
        
    }
    return notNullArray.length ? notNullArray : null;
}
 