import { expect } from "chai";
import { createValidationPin } from "../create-validation-pin";
import { createEmail } from "./index";

describe('test create email template', () => {
    it('singup email: return true if returned value is string and includes the variables', () => {
        const pin = createValidationPin();
        const data = {
            user_fullname: "Jose Quesada",
            user_validatetion_pin: pin,
        }
        const result = createEmail('/templates/signup-email/template.html', data);
        expect(result.data).to.be.a("string");
        expect(result.data).to.include("Jose Quesada");
        expect(result.data).to.include(pin);
    });

    it('reset password email: return true if returned value is string and includes the variables', () => {
        const pin = createValidationPin();
        const data = {
            user_reset_password_pin: pin,
        }
        const result = createEmail('/templates/forget-password/template.html', data);
        expect(result.data).to.be.a("string");
        expect(result.data).to.include(pin);
    });
});