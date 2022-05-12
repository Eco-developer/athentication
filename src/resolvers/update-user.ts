import { ForbiddenError } from "apollo-server-express";
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import 'dotenv/config';
import { 
    handleEdit,
    transformObjectToArray,
    transformArrayToObject,
} from "../services";

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
            throw new ForbiddenError("the argument type is not been passed.");
        }
        const userUpdated = handleEdit(type, user, rest);
        userUpdated.save();
        const editedPropertiesObj = transformArrayToObject(propertiesToUpdate);
        return {
            ...editedPropertiesObj
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}