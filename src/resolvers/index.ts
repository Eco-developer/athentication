import { signUp } from "./signUp";
import { user } from "./query-user";
import { users } from "./query-users";

export const resolvers = {
    Query: {
        users,
        user,
    },

    Mutation: {
        signUp,
    }
}