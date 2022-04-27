import { patterns } from '../../const';

export const validate = (email: string, password: string):boolean => {
	const emailValidator = new RegExp(patterns.emailPattern);
	const passwordValidator = new RegExp(patterns.passwordPattern);
	return emailValidator.test(email) && passwordValidator.test(password);
}