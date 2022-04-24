import { expect } from "chai";
import { v4 as uuid } from 'uuid';
import { signUp } from "./test-apis";
import { models } from "../src/models";

describe("end to end singUp test", () => {
    
    it("should return the user and token after sing up", async () => {
        const userData = {
            userId: uuid(),
            userRoles: ["user"],  
            userFullname: "jose",
            userEmail: "user@example.com", 
            userPassword: "123456Jm.",
            userConfirmEmail: false,
        }
        const result = await signUp(userData);
        expect(result.data.data.signUp).to.have.property("user");
        expect(result.data.data.signUp).to.have.property("token");
        expect(result.data.data.signUp.user).to.have.property("user_email");
        expect(result.data.data.signUp.user).to.have.property("user_fullname");
        expect(result.data.data.signUp.user).to.have.property("user_id");
        expect(result.data.data.signUp.user).to.have.property("user_confirm_email");       
    }).timeout(20000)
})