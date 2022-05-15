import bcrypt from 'bcrypt';
import { expect } from "chai";
import { 
    connectDb, 
    models 
} from "../src/models";
import { updateUser } from "./test-apis";
import { roles } from  '../src/const/index';
import { createToken } from '../src/services';
import { v4 as uuid } from 'uuid';
import { types } from '../src/const/index';

describe("end to end update user by user_id test", () => {
    before(async () => {
        await connectDb();
        await models.User.deleteMany({});
        const hashPassword = await bcrypt.hash(`123456Jm.`, 8);
        const userData: any = {
            user_id: "test-update-user_id",
            user_roles: [roles.USER],  
            user_fullname: "jose",
            user_email: `user@updatetest.com`, 
            user_password: hashPassword,
            user_confirm_email: false,
        }
        const userTest = new models.User(userData);
        await userTest.save();
    });

    it("should return an error because the user_id is invalid", async () => {
        const token = createToken(
            `user@updatetest.com`, 
            "test-update-wrong-user_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const userData = {
            type: types.EDIT_LITERAL_PROPERTIES,
            userId : "test-update-wrong-user_id",
            userAvatar: "https://image-edited.png",
            userConfirmEmail: true,
         
        }
        const result = await updateUser(userData, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("there is not a user with that user_id.");
  
    })

    it("should return an error if user-token is not valid", async () => {
        const token = "faketokentest"
        const userData = {
            type: types.EDIT_LITERAL_PROPERTIES,
            userId : "test-update-user_id",
            userAvatar: "https://image-edited.png",
            userConfirmEmail: true,
        }
        const result = await updateUser(userData, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.equal("Your session expired, sign in again.");
  
    })

    it("should return a forbidden error as not authenticated", async () => {
        const userData = {
            type: types.EDIT_LITERAL_PROPERTIES,
            userId : "test-update-user_id",
            userAvatar: "https://image-edited.png",
            userConfirmEmail: true,
        }
        const result = await updateUser(userData);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("Not authenticated as user.");  
    })

    it("should return an error because no editable property was passed", async () => {
        const token = createToken(
            "test-update-user_id",
            `user@updatetest.com`, 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const userData = {
            type: types.EDIT_LITERAL_PROPERTIES,
            userId : "test-update-user_id",
        }
        const result = await updateUser(userData, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("No editable property was passed.");
    })

    it(`should return an error because the editable properties that have been passed does not match the type ${types.EDIT_ARRAY_PROPERTIES} `, async () => {
        const token = createToken(
            "test-update-user_id",
            `user@updatetest.com`, 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const userData = {
            type: types.EDIT_ARRAY_PROPERTIES,
            userId : "test-update-user_id",
            userAvatar: "https://image-edited.png",
            userConfirmEmail: true,
        }
        const result = await updateUser(userData, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("The editable properties that have been passed does not match the type argument.");
    })

    it(`should return an error because the editable properties that have been passed does not match the type ${types.EDIT_LITERAL_PROPERTIES} `, async () => {
        const token = createToken(
            "test-update-user_id",
            `user@updatetest.com`, 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const userData = {
            type: types.EDIT_LITERAL_PROPERTIES,
            userId: "test-update-user_id",
            userOrders: [uuid(), uuid()],
        }
        const result = await updateUser(userData, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("The editable properties that have been passed does not match the type argument.");
    })

    it(`should return the type ${types.EDIT_ARRAY_PROPERTIES} and the edited properties`, async () => {
        const token = createToken(
            "test-update-user_id",
            `user@updatetest.com`, 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const userData = {
            type: types.EDIT_ARRAY_PROPERTIES,
            userId: "test-update-user_id",
            userOrders: [uuid(), uuid()],
        }
        const result = await updateUser(userData, token);
        expect(result.data.data).to.have.property("updateUser");
        expect(result.data.data.updateUser).to.have.property("edited");
        expect(result.data.data.updateUser).to.have.property("type");
        expect(result.data.data.updateUser.type).to.be.equal(types.EDIT_ARRAY_PROPERTIES);
        expect(result.data.data.updateUser.edited).to.have.property("user_orders");
        expect(result.data.data.updateUser.edited.user_orders).to.have.lengthOf(2);
    })

    it(`should return the type ${types.EDIT_LITERAL_PROPERTIES} and the edited properties`, async () => {
        const token = createToken(
            "test-update-user_id",
            `user@updatetest.com`, 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const userData = {
            type: types.EDIT_LITERAL_PROPERTIES,
            userId: "test-update-user_id",
            userAvatar: "https://image-edited.png",
            userConfirmEmail: true,
        }
        const result = await updateUser(userData, token);
        expect(result.data.data).to.have.property("updateUser");
        expect(result.data.data.updateUser).to.have.property("edited");
        expect(result.data.data.updateUser).to.have.property("type");
        expect(result.data.data.updateUser.type).to.be.equal(types.EDIT_LITERAL_PROPERTIES);
        expect(result.data.data.updateUser.edited).to.have.property("user_avatar");
        expect(result.data.data.updateUser.edited).to.have.property("user_confirm_email");
        expect(result.data.data.updateUser.edited.user_avatar).to.be.equal("https://image-edited.png");
        expect(result.data.data.updateUser.edited.user_confirm_email).to.be.true;
    })

})