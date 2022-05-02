import { 
    Context,
} from "../interfaces";

export const users = async (parent: any, args: null, context: Context) => {
    try {
        const {
            models : {
                User,
            }
        } = context;

        const usersIndDb = await User.find();
       
        return usersIndDb;
    } catch (error:any) {
        throw new Error(error.message);
    }
}