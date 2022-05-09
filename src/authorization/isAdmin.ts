import { 
    ForbiddenError,
} from "apollo-server-express";
import { skip } from "graphql-resolvers";
import { Context } from "../interfaces";
import { roles } from "../const/index";
import 'dotenv/config';

export const isAdmin = (parent: any, args: any, context: Context) => {
    const { 
        user_roles,
    } = args;
    if (user_roles.includes(roles.ADMIN)) {
        return skip;
    }
    return new ForbiddenError("Not an admin user.");
}