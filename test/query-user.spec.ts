import { expect } from "chai";
import { queryUser } from "./test-apis";
import { models } from "../src/models";
import { UserInterface } from "../src/interfaces";

describe("end to end query user by user_id", () => {
    before(async () => {
        await models.User.deleteMany({});
        const userData: UserInterface = {
            user_id: "test-user_id",
            user_roles: ["user"],  
            user_fullname: "jose",
            user_email: `user@test.com`, 
            user_password: `123456Jm.`,
            user_confirm_email: false,
        }
        const userTest = new models.User(userData);
        await userTest.save();
    });

    it("should return the user info that correpond to the user_id", async () => {
        const result = await queryUser({userId : "test-user_id"});
        expect(result.data.data).to.have.property("user");
        expect(result.data.data.user).to.have.property("user_email");
        expect(result.data.data.user).to.have.property("user_fullname");
        expect(result.data.data.user).to.have.property("user_id");
        expect(result.data.data.user.user_id).to.be.equal("test-user_id");
        expect(result.data.data.user).to.have.property("user_confirm_email");  
    })
})