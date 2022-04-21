import { expect } from "chai";
import { resolvers } from "../src/resolvers";

describe('createUser', () => {
    it('should create a user in database', async () => {
        const expextedResult = {
            user: {
                user_id: "asdas",
                user_fullname: "asda",
                user_email: "asda",
                user_password: "asda",
                user_avatar: "asd",
                user_address: "lo que sea",
                user_confirm_email: false,
            }
        }
        const result:any = await resolvers.Mutation.createUser(expextedResult.user);
        expect(result).to.eql(expextedResult);
    })
})
