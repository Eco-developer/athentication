import { transformObjectToArray } from "../transform-object-to-array";
import { keys } from "../../const";

export const handleEditLiterals = (objectToEdit : any, objectProperties: any) => {
    const propertiesToEdit = transformObjectToArray(objectProperties);
    if (!propertiesToEdit) {
        return objectToEdit;
    }
    for (let i = 0; i < propertiesToEdit.length; i++) {
        if (propertiesToEdit[i]) {
            const key = Object.keys(propertiesToEdit[i])[0];
            const property = keys.find((item) => item ===key);
            if (property) {
                objectToEdit[property] = propertiesToEdit[i][property];
            }
        }
    }
    return objectToEdit;
}