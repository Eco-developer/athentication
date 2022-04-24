import { expect } from "chai";
import { signUp } from "./index";
import { v4 as uuid } from 'uuid';
import { context } from '../../context/index';
import { connectDb } from "../../models";

describe("resolver testing", () => {
    it("test signUp resolver", async () => {
        await connectDb()
        const userData = {
            user_confirm_email: false, 
            user_email: "user@example.com", 
            user_fullname: "Jose quesada", 
            user_id: uuid(), 
            user_password: "123456Jm.",
            user_roles: ["user"]
        }
        
            const result = await signUp(null, userData, context);
            expect(result?.user).to.have.property("user_email");
            expect(result?.user).to.have.property("user_fullname");
            expect(result?.user).to.have.property("user_id");
            expect(result?.user).to.have.property("user_confirm_email");
   
        
       
    }).timeout(50000)

})