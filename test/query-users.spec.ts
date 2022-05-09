import bcrypt from 'bcrypt';
import { expect } from "chai";
import { queryUsers } from "./test-apis";
import { createToken } from "../src/services";
import { 
    connectDb, 
    models 
} from "../src/models";
import { UserInterface } from "../src/interfaces";
import { roles } from  '../src/const/index';
import 'dotenv/config';

describe("end to end query users and paginated", () => {
    before(async () => {
        await connectDb();
        await models.User.deleteMany({});
        const hashPassword = await bcrypt.hash(`123456Jm.`, 8);
        const userData: UserInterface = {
            user_id: "test-users-user_id",
            user_roles: [roles.USER],  
            user_fullname: "jose",
            user_email: `user@userstest.com`, 
            user_password: hashPassword,
            user_confirm_email: false,
        }
        const userTest = new models.User(userData);
        await userTest.save();
    });
    it("should return a forbidden error as not authenticated", async () => {
        const data = {
            userRoles : [roles.ADMIN],
            limit: 10, 
            page: 1,
        }
        const result = await queryUsers(data);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("Not authenticated as user.");  
    })

    it("should return an error if user is not an admin", async () => {
        const token = createToken(
            `user@test_incorrect.com`, 
            "test-user_id_incorrect", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const data = {
            userRoles : [roles.USER],
            limit: 10, 
            page: 1,
        }
        const result = await queryUsers(data, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("Not an admin user."); 
    })

    it("should return an error if user-token is not valid", async () => {
        const token = "faketokentest"
        const data = {
            userRoles : [roles.ADMIN],
            limit: 10, 
            page: 1,
        }
        const result = await queryUsers(data, token);
        expect(result.data).to.have.property("errors");
        expect(result.data.errors[0].message).to.be.equal("Your session expired, sign in again."); 
    })
 

    it("should return the users array", async () => {
        const token = createToken(
            `user@test.com`, 
            "test-user_id", 
            `${process.env.JWT_SECRET}`, 
            "30m"
        );
        const data = {
            userRoles : [roles.ADMIN],
            limit: 10, 
            page: 1,
        }

        const result = await queryUsers(data, token);
        expect(result.data.data).to.have.property("users");
        expect(result.data.data.users).to.have.property("users");
        expect(result.data.data.users).to.have.property("maxlentgh");
        expect(result.data.data.users.maxlentgh).to.be.equal(1);
    })
})