import { expect } from "chai";
import { handleEditarray } from "./index";
import { v4 as uuid } from 'uuid';

describe('test handleEditarray function', () => {
    it('return the object with no property changed.', () => {
        const objectToEdit = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
            user_basquet: [],
            user_orders: [uuid(), uuid()],
        }
        const objectProperties = {}
        const result = handleEditarray(objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
        expect(result.user_basquet).to.have.lengthOf(0);
        expect(result.user_orders).to.have.lengthOf(2);
    });

    it('return the object with edited properties.', () => {
        const objectToEdit = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
            user_basquet: [],
            user_orders: ["123123123", "12323"],
        }
        const objectProperties = {
            user_basquet: [uuid(), uuid()],
            user_orders: [uuid(), uuid(), uuid()],
        }
        const result = handleEditarray(objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
        expect(result.user_basquet).to.have.lengthOf(2);
        expect(result.user_orders).to.have.lengthOf(5);
    });
});