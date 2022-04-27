import { expect } from "chai";
import { createToken } from "./index";
import { v4 as uuid } from 'uuid';
import 'dotenv/config';

describe('test create jwt token', () => {
    it('return true if returned value is string', () => {
        const email = "jose@gmail.com";
        const id = uuid();
        const token = createToken(email, id, `${process.env.JWT_SECRET}`, "30min");
        expect(token).to.be.a("string");
    });
});