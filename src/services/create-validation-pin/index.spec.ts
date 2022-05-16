import { expect } from "chai";
import { createValidationPin } from "./index";

describe('test create validation pin', () => {
    it('return true if returned value is string & has length of 8', () => {

        const pin = createValidationPin();
        expect(pin).to.be.a("string");
        expect(pin).to.have.lengthOf(8);
    });
});