import bcrypt from 'bcrypt';
import { 
	createToken,
	validate,
} from '../services/index';
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import 'dotenv/config';
import { createValidationPin } from '../services/create-validation-pin';

export const signUp = async (parent: any, args: GraphqlResolversTypes.MutationSignUpArgs, context: Context) => {
    try {
       const { 
		   models, 
		   secret 
		} = context;
       const {
            user_email,
            user_password,
            ...rest
        } = args
       const isValid = validate(user_email, user_password);
       if (!isValid) {
		throw new Error("The credentials are invalid");
       }
	   
       let user = await models.User.findOne({user_email: user_email});
        if (user) {
            throw new Error("There is a user with this email already");
        }
        const hashPassword = await bcrypt.hash(user_password, 8);
        const user_validatetion_pin = createValidationPin();
		user = new models.User({
            ...rest, 
            user_email, 
            user_password: hashPassword,
            user_validatetion_pin,
        });
		await user.save();
		const signedUser = await models.User.findOne({user_email});
		if (!signedUser) {
            throw new Error("Something went wrong");
        }
		const { 
			user_password : hashedPassword, 
			...restsigned
		} = signedUser.toObject();

		const token = createToken(restsigned.user_email, restsigned.user_id, secret, "30m");

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
