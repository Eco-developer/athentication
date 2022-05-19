import bcrypt from 'bcrypt';
import axios from 'axios';
import { 
	createToken,
	validate,
    createValidationPin
} from '../services/index';
import { 
    Context,
    GraphqlResolversTypes
} from "../interfaces";
import 'dotenv/config';


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

        const mailData = {
            from: 'josesk8mqc@gmail.com', // sender address
            to: user_email, // list of receivers
            subject: `Hi ${restsigned.user_fullname}, please verify your account`, // Subject line
            contentText: "Account Verification. Thank you for choosing Mailgun! Please confirm your email address by clicking the link below. We'll communicate important updates with you from time to time via email, so it's essential that we have an up-to-date email address on file.", // plain text body
            contentHtml: `<br>Account Verification.</br>Thank you for choosing Mailgun! Please confirm your email address by clicking the link below. We'll communicate important updates with you from time to time via email, so it's essential that we have an up-to-date email address on file.</br></br>your confirmation pin is <strong>${user_validatetion_pin}</strong>`, // html body
        }

        await axios.post(
            `${process.env.MAIL_MICROSERVICE}`,
            mailData
        )   

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
