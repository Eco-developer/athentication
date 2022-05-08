import { signUp } from "./signUp";
import { user } from "./query-user";
import { users } from "./query-users";
import { 
    isAuthenticated 
} from "../authorization";
import { combineResolvers } from "graphql-resolvers";

export const resolvers = {
    Query: {
        users,
        user: combineResolvers(
            isAuthenticated,
            user,
        ),
    },

    Mutation: {
        signUp,
    }
}