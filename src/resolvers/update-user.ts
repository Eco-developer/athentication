import { ForbiddenError } from "apollo-server-express";
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import { 
    handleEdit,
    transformObjectToArray,
    transformArrayToObject,
} from "../services";
import { types } from '../const/index';
import 'dotenv/config';

export const updateUser = async (parent: any, args: GraphqlResolversTypes.MutationUpdateUserArgs, context: Context) => {
    try {
        const {
            models
        } = context;
        const {
            user_id,
            type,
            ...rest
        } = args;

        const user = await models.User.findOne({user_id});
       
        if (!user) {
            throw new ForbiddenError("there is not a user with that user_id.");
            
        }

        if (!type) {
            throw new ForbiddenError("the argument type is not been passed.");
        }
        const propertiesToUpdate = transformObjectToArray(rest);
        if (!propertiesToUpdate) {
            throw new ForbiddenError("No editable property was passed.");
        }
        if ((type === types.EDIT_ARRAY_PROPERTIES && !rest.user_orders ) || (type === types.EDIT_ARRAY_PROPERTIES && !rest.user_basquet )) {
            throw new ForbiddenError("The editable properties that have been passed does not match the type argument.");
        }
        if ((type === types.EDIT_LITERAL_PROPERTIES && rest.user_orders ) || (type === types.EDIT_LITERAL_PROPERTIES && rest.user_basquet )) {
            throw new ForbiddenError("The editable properties that have been passed does not match the type argument.");
        }
        const userUpdated = handleEdit(type, user, rest);
        userUpdated.save();
        const editedPropertiesObj = transformArrayToObject(propertiesToUpdate);
        console.log(type)
        console.log(editedPropertiesObj)

        return {
            type,
            edited: {
                ...editedPropertiesObj
            }
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}