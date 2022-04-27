import { expect } from "chai";
import { validate } from "./index";

describe('test email & password validator', () => {
    it('return true if email & password are valid', () => {
        const email = "jose@gmail.com";
        const password = "12345Jm.";
        const isValid = validate(email, password);
        expect(isValid).to.equal(true);
    });

    it('return false if email is not valid', () => {
        const email = "josegmail.com";
        const password = "12345Jm.";
        const isValid = validate(email, password);
        expect(isValid).to.equal(false);
    });
    it('return false if password is not valid', () => {
        const email = "jose@gmail.com";
        const password = "12345Jm";
        const isValid = validate(email, password);
        expect(isValid).to.equal(false);
    });
});