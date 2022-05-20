import { expect } from "chai";
import {sendMail } from "./index";

describe('test send email', () => {
    it('return true if returned value is string and includes the variables', async () => {
        const result = await sendMail(
            "josesk8mqc@gmail.com", 
            "josesk8mqc@gmail.com", 
            `hi jose Quesada`, 
            "Test", 
            '/templates/signup-email/template.html', 
            { user_fullname: "Jose Quesada" }
        );
        expect(result.data).to.have.property("messageId");
    });
});