import { expect } from "chai";
import { createEmail } from "./index";

describe('test create email template', () => {
    it('return true if returned value is string and includes the variables', () => {
        const result = createEmail('/templates/signup-email/template.html', {user_fullname: "Jose Quesada"});
        expect(result.data).to.be.a("string");
        expect(result.data).to.include("Jose Quesada")
    });
});