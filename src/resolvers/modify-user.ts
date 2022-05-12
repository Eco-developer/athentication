import { ForbiddenError } from "apollo-server-express";
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import 'dotenv/config';

export const modifyUser = async (parent: any, args: GraphqlResolversTypes.MutationModifyUserArgs, context: Context) => {
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

        return {
            deleted: true
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}