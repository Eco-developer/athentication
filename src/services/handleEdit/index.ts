import { handleEditLiterals } from "../handle-edit-literals";
import { handleEditarray } from "../handle-edit-array";
import { types } from '../../const/index';

export const handleEdit = (type : string, objectToEdit : any, objectProperties: any) => {
    switch (type) {
        case types.EDIT_LITERAL_PROPERTIES:
            return handleEditLiterals(objectToEdit, objectProperties);
        case types.EDIT_ARRAY_PROPERTIES:
            return handleEditarray(objectToEdit, objectProperties);
        default:
            return handleEditLiterals(objectToEdit, objectProperties);
    }

}