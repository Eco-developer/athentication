import jwt from 'jsonwebtoken';

export const createToken = (user_email: string, user_id: string, secret: string, expiresIn: string):string => {
	const token = jwt.sign({ user_email, user_id }, secret, { expiresIn });
	return token;
}