import { 
    Context, 
    GraphqlResolversTypes,
} from "../interfaces";

export const users = async (parent: any, args:  GraphqlResolversTypes.QueryUsersArgs, context: Context) => {
    try {
        const {
            models : {
                User,
            }
        } = context;

        const {
            limit,
            page
        } = args;
        const currentPage = page ? page - 1 : 0;
        const currentLimit = limit || 10;
        const usersIndDb = await User.find().skip(currentLimit * currentPage).limit(currentLimit);
        const maxlentgh: number = await User.count();

        return { 
            users : [...usersIndDb],
            maxlentgh,
            
        };
    } catch (error:any) {
        throw new Error(error.message);
    }
}