import { signUp } from "./signUp";
import { login } from "./login";
import { user } from "./query-user";
import { users } from "./query-users";
import { deleteUser } from "./delete-user";
import { 
    isAuthenticated,
    isAdmin,
} from "../authorization";
import { combineResolvers } from "graphql-resolvers";
import { updateUser } from "./update-user";

export const resolvers = {
    Query: {
        users: combineResolvers(
            isAuthenticated,
            isAdmin,
            users,
        ),
        user: combineResolvers(
            isAuthenticated,
            user,
        ),
        
    },

    Mutation: {
        signUp,
        login,
        deleteUser: combineResolvers(
            isAuthenticated,
            deleteUser,
        ),
        updateUser: combineResolvers(
            isAuthenticated,
            updateUser,
        ),
        
    }
}