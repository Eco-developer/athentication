import bcrypt from 'bcrypt';
import {
	createToken,
} from '../services/index';
import {
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import { AuthenticationError } from "apollo-server-express";
import 'dotenv/config';

export const login = async (parent: any, args: GraphqlResolversTypes.MutationLoginArgs, context: Context) => {
    try {
        const {
		   models,
		   secret
		} = context;
        const {
            user_email,
            user_password,
        } = args

		const signedUser = await models.User.findOne({user_email});
		if (!signedUser) {
            throw new AuthenticationError("Invalid Email");
        }

		const {
			user_password : hashedPassword,
			...restsigned
		} = signedUser.toObject();

        const isValid = await bcrypt.compare(
            hashedPassword,
            user_password
        );

        if (!isValid) {
            throw new AuthenticationError("Invalid password");
        }
		const token = createToken(restsigned.user_email, restsigned.user_id, secret, "30m")

		return {
            user: {
                ...restsigned
            },
            token,
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}
