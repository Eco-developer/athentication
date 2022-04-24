import { signUp } from "./sign-up";

export const resolvers = {
    Query: {
        users: (parent: any, args: any, context: any) => {
        },
        user: (parent: any, args: any, context: any) => {
        }
    },

    Mutation: {
        signUp,
    }
}