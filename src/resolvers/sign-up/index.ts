import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { 
    UserInterface, 
    Context,
    GraphqlResolversTypes
} from "../../interfaces";
import { patterns } from '../../const';
import 'dotenv/config';

const validate = (email: string, password: string) => {
	const emailValidator = new RegExp(patterns.emailPattern);
	const passwordValidator = new RegExp(patterns.passwordPattern);
	return emailValidator.test(email) && passwordValidator.test(password);
}

const createToken = (user_email: string, user_id: string, secret: string, expiresIn: string) => {
	const token = jwt.sign({ user_email, user_id }, secret, { expiresIn });
	return token;
}

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
        console.log('aqui pasa algo')
        console.log(rest)
       const isValid = validate(user_email, user_password);
       console.log(isValid)
       if (!isValid) {
		throw new Error("The credentials are invalid");
       }
	   
	   console.log(models)
	  
       let user = await models.User.findOne({user_email: user_email});
       console.log(user)
        if (user) {
            throw new Error("There is a user with this email already");
        }
        const hashPassword = await bcrypt.hash(user_password, 8);
	   console.log(hashPassword)
		user = new models.User({...rest, user_email, user_password: hashPassword});
		await user.save();
		const signedUser = await models.User.findOne({user_email});
		if (!signedUser) {
            throw new Error("Something went wrong");
        }
		const { 
			user_password : hashedPassword, 
			...restsigned
		} = signedUser.toObject();
		console.log(restsigned)

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


/*
const signUpHandler = async (req, res) => {
	const isValid = validate(req.body.user_email, req.body.user_password);

	if (!isValid) {
		return res.status(400).send('email or passaword are invalids')
	}

	let user = await models.User.findOne({user_email: req.body.user_email});
	if (user) {
		return res.status(400).send({
			type: 'email', 
			message: 'User with this email address already exist'})
	}
	try {
		const hashPassword = await bcrypt.hash(req.body.user_password, 8);
		user = new models.User({...req.body, user_password: hashPassword});
		await user.save();
		const signedUser = await models.User.findOne({user_email: req.body.user_email});
		
		const { 
			user_password, 
			...rest 
		} = signedUser._doc;
		
		res.status(201).send({...rest});
	} catch (error) {
		return res.status(500).send('something went wrong')
	}
};
*/