import { ForbiddenError } from "apollo-server-express";
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import 'dotenv/config';

export const deleteUser = async (parent: any, args: GraphqlResolversTypes.MutationDeleteUserArgs, context: Context) => {
    try {
        const {
            models
        } = context;
        const {
            user_id,
        } = args
        console.log(`this user id ${user_id}`)
        const isUser = models.User.findOne({user_id});
        if (!isUser) {
            throw new ForbiddenError("there is not a user with that user_id.");
        }
        models.User.deleteOne({user_id});
        return {
            deleted: true
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}