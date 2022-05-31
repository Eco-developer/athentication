/*import { expect } from "chai";
import { sendMail } from "./index";
import { createValidationPin } from "../create-validation-pin";

describe('test send email', () => {
    it('singup email: return true if message was sended and return messageId', async () => {
        const pin = createValidationPin();
        const result = await sendMail(
            "josesk8mqc@gmail.com", 
            "josesk8mqc@gmail.com", 
            `Hi jose Quesada, please verify your account.`, 
            "Test", 
            '/templates/signup-email/template.html', 
            { 
                user_fullname: "Jose Quesada", 
                user_validatetion_pin: pin,
            }
        );
        expect(result.data).to.have.property("messageId");
    });
    it('reset password email:  return true if message was sended and return messageId', async () => {
        const pin = createValidationPin();
        const result = await sendMail(
            "josesk8mqc@gmail.com", 
            "josesk8mqc@gmail.com", 
            `Hi jose Quesada, please verify you are a client before reset password.`, 
            "Test", 
            '/templates/forget-password/template.html', 
            { 
                user_reset_password_pin: pin,
            }
        );
        expect(result.data).to.have.property("messageId");
    });
});*/