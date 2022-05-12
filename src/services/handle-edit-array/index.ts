
import { EditablePropertiesInterface } from "../../interfaces";

export const handleEditarray = (objectToEdit : any, objectProperties: EditablePropertiesInterface) => {
    if (objectProperties.user_basquet && objectProperties.user_basquet.length) {
        objectToEdit.user_basquet = [...objectProperties.user_basquet]
    } 
    if (objectProperties.user_orders && objectProperties.user_orders.length) {
        objectToEdit.user_orders = [...objectToEdit.user_orders, ...objectProperties.user_orders]
    }
    
    return objectToEdit;
}