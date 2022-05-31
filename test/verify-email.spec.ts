import bcrypt from 'bcrypt';
import { expect } from "chai";
import { 
    connectDb, 
    models 
} from "../src/models";
import { verifyEmail } from "./test-apis";
import { roles } from  '../src/const/index';
import { UserInterface } from "../src/interfaces";
import { createToken } from '../src/services';

describe("end to end verify email by user_id test", () => {
    before(async () => {
        await connectDb();
        await models.User.deleteMany({});
        const hashPassword = await bcrypt.hash(`123456Jm.`, 8);
        const userData: UserInterface = {
            user_id: "test-verify-email_id",
            user_roles: [roles.USER],  
            user_fullname: "jose",
            user_email: `user@verifyemailtest.com`, 
            user_password: hashPassword,
            user_confirm_email: false,
            user_validatetion_pin: "validation-pin"
        }
        const userTest = new models.User(userData);
        await userTest.save();
    });

    it("should return an error because the user_id is invalid", async () => {
        const token = createToken(
            `user@verifyemailtest.com`, 
            "test-verify-wrong-email_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const result = await verifyEmail({ userId: "test-verify-wrong-email_id", userValidatetionPin: "some-validation-pin" }, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("there is not a user with that user_id.");
  
    })

    it("should return an error if user-token is not valid", async () => {
        const token = "faketokentest"
        const result = await verifyEmail({ userId: "test-verify-email_id", userValidatetionPin: "validation-pin" }, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("Your session expired, sign in again.");
  
    })

    it("should return a forbidden error as not authenticated", async () => {

        const result = await verifyEmail({ userId: "test-verify-email_id", userValidatetionPin: "validation-pin" });
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("Not authenticated as user.");  
    })
    
    it("should return false if the user_validation_pin is incorrect", async () => {
        const token = createToken(
            `user@verifyemailtest.com`, 
            "test-verify-email_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const result = await verifyEmail({ userId: "test-verify-email_id", userValidatetionPin: "wrong-validation-pin" }, token);
        expect(result.data.data).to.have.property("verifyEmail");
        expect(result.data.data.verifyEmail).to.have.property("verified");
        expect(result.data.data.verifyEmail.verified).to.be.false;
    })

    it("should return true if the user_validation_pin is correct", async () => {
        const token = createToken(
            `user@verify-emailtest.com`, 
            "test-verify-email_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const result = await verifyEmail({ userId: "test-verify-email_id", userValidatetionPin: "validation-pin" }, token);
        expect(result.data.data).to.have.property("verifyEmail");
        expect(result.data.data.verifyEmail).to.have.property("verified");
        expect(result.data.data.verifyEmail.verified).to.be.true;
    })
})