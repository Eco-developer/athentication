import { createUser } from "./createUserResolver";

export const resolvers = {
    Query: {
        users: (parent: any, args: any, context: any) => {
            return context.models.User.getAll();
        },
        user: (parent: any, args: any, context: any) => {
            return context.models.User.findById(args.user_id);
        }
    },

    Mutation: {
        createUser,
    }
}