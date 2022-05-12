import bcrypt from 'bcrypt';
import { expect } from "chai";
import { 
    connectDb, 
    models 
} from "../src/models";
import { updateUser } from "./test-apis";
import { roles } from  '../src/const/index';
import { UserInterface } from "../src/interfaces";
import { createToken } from '../src/services';
import { types } from '../src/const/index';

describe("end to end delete user by user_id test", () => {
    before(async () => {
        await connectDb();
        await models.User.deleteMany({});
        const hashPassword = await bcrypt.hash(`123456Jm.`, 8);
        const userData: any = {
            type: types.EDIT_LITERAL_PROPERTIES,
            user_id: "test-update-user_id",
            user_roles: [roles.USER],  
            user_fullname: "jose",
            user_email: `user@deletetest.com`, 
            user_password: hashPassword,
            user_confirm_email: false,
        }
        const userTest = new models.User(userData);
        await userTest.save();
    });

    it("should return an error because the user_id is invalid", async () => {
        const token = createToken(
            `user@deletetest.com`, 
            "test-delete-wrong-user_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
       // const result = await deleteUser({userId : "test-delete-wrong-user_id"}, token);
      //  expect(result.data).to.have.property("errors");
      //  expect(result.data.errors[0].message).to.equal("there is not a user with that user_id.");
  
    })

    it("should return an error if user-token is not valid", async () => {
        const token = "faketokentest"
    // const    const result = await deleteUser({userId : "test-delete-user_id"}, token);
     //   expect(result.data).to.have.property("errors");
   //     expect(result.data.errors[0].message).to.equal("Your session expired, sign in again.");
  
    })

    it("should return a forbidden error as not authenticated", async () => {

       // const result = await deleteUser({userId : "test-user_id"});
     //   expect(result.data).to.have.property("errors");
     //   expect(result.data.errors[0].message).to.be.equal("Not authenticated as user.");  
    })
    
    it("should return a confirmation that the user was successfully deleted", async () => {
        const token = createToken(
            `user@deletetest.com`, 
            "test-delete-user_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
      //  const result = await deleteUser({userId : "test-delete-user_id"}, token);
      //  expect(result.data.data).to.have.property("deleteUser");
       // expect(result.data.data.deleteUser).to.have.property("deleted");
    //    expect(result.data.data.deleteUser.deleted).to.be.true;
    })
})