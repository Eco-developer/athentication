import bcrypt from 'bcrypt';
import { expect } from "chai";
import { connectDb, models } from "../src/models";
import { login } from "./test-apis";
import { roles } from  '../src/const/index';
import { UserInterface } from "../src/interfaces";

describe("end to end login test", () => {
    before(async () => {
        await connectDb();
        await models.User.deleteMany({});
        const hashPassword = await bcrypt.hash(`123456Jm.`, 8);
        const userData: UserInterface = {
            user_id: "test-login-user_id",
            user_roles: [roles.USER],  
            user_fullname: "jose",
            user_email: `user@logintest.com`, 
            user_password: hashPassword,
            user_confirm_email: false,
        }
        const userTest = new models.User(userData);
        await userTest.save();
    });

    it("should return an error because the email is invalid", async () => {
        const userData = {
            userEmail: `user@logintestfailed.com`, 
            userPassword: `123456Jm.`,
        }
        const result = await login(userData);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("The email is invalid.");
  
    })

    it("should return an error because the password is invalid", async () => {
        const userData = {
            userEmail: `user@logintest.com`, 
            userPassword: `123456J`,
        }
        const result = await login(userData);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("The password is invalid.");
  
    })
    
    it("should return the user and token after login", async () => {
        const userData = {
            userEmail: `user@logintest.com`, 
            userPassword: `123456Jm.`,
        }
        const result = await login(userData);
        expect(result.data.data.login).to.have.property("user");
        expect(result.data.data.login).to.have.property("token");
        expect(result.data.data.login.user).to.have.property("user_email");
        expect(result.data.data.login.user).to.have.property("user_fullname");
        expect(result.data.data.login.user).to.have.property("user_id");
        expect(result.data.data.login.user).to.have.property("user_confirm_email");    
           
    })
})