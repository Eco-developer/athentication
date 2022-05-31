import { signUp } from "./signUp";
import { login } from "./login";
import { user } from "./query-user";
import { users } from "./query-users";
import { deleteUser } from "./delete-user";
import { updateUser } from "./update-user";
import { verifyEmail } from "./veifry-email";
import { 
    isAuthenticated,
    isAdmin,
} from "../authorization";
import { combineResolvers } from "graphql-resolvers";


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
        verifyEmail: combineResolvers(
            isAuthenticated,
            verifyEmail,
        )
        
    }
}