import { ForbiddenError } from "apollo-server-express";
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import 'dotenv/config';

export const verifyEmail = async (parent: any, args: GraphqlResolversTypes.MutationVerifyEmailArgs, context: Context) => {
    try {
        const {
            models
        } = context;
        const {
            user_id,
            user_validatetion_pin
        } = args;

        const user = await models.User.findOne({user_id});
       
        if (!user) {
            throw new ForbiddenError("there is not a user with that user_id.");
        }

        const verified = user.user_validatetion_pin === user_validatetion_pin;
        if (verified) {
            user.user_confirm_email = verified;
            user.save();          
        }
        return {
            verified,
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}