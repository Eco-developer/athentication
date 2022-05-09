import jwt from 'jsonwebtoken';
import { 
    ForbiddenError,
    AuthenticationError,
} from "apollo-server-express";
import { skip } from "graphql-resolvers";
import { Context } from "../interfaces";
import 'dotenv/config';

export const isAuthenticated = (parent: any, args: any, context: Context) => {
    const { 
        token,
    } = context;
    if (token) {
        try {
            jwt.verify(token.toString(), `${process.env.JWT_SECRET}`);
            return skip;
        } catch (err) {
            return new AuthenticationError("Your session expired, sign in again.")
        }
    }
    return new ForbiddenError("Not authenticated as user.");
}