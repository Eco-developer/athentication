import { expect } from "chai";
import { queryUser } from "./test-apis";
import { createToken } from "../src/services";
import { 
    connectDb, 
    models 
} from "../src/models";
import { UserInterface } from "../src/interfaces";
import 'dotenv/config';

describe("end to end query user by user_id", () => {
    before(async () => {
        await connectDb();
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

    it("should return an error if user_id is not in the db", async () => {
        const token = createToken(
            `user@test_incorrect.com`, 
            "test-user_id_incorrect", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const result = await queryUser({userId : "test-user_id_incorrect"}, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("There is not a user with this user_id in the database"); 
    })

    it("should return a forbidden error as not authenticated", async () => {

        const result = await queryUser({userId : "test-user_id"});
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("Not authenticated as user.");  
    })

    it("should return the user info that correpond to the user_id", async () => {
        const token = createToken(
            `user@test.com`, 
            "test-user_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const result = await queryUser({userId : "test-user_id"}, token);
        expect(result.data.data).to.have.property("user");
        expect(result.data.data.user).to.have.property("user_email");
        expect(result.data.data.user).to.have.property("user_fullname");
        expect(result.data.data.user).to.have.property("user_id");
        expect(result.data.data.user.user_id).to.be.equal("test-user_id");
        expect(result.data.data.user).to.have.property("user_confirm_email");  
    })
})