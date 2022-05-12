import { expect } from "chai";
import { handleEditLiterals } from "./index";

describe('test handleEditLiterals function', () => {
    it('return the object with no property changed.', () => {
        const objectToEdit = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
        }
        const objectProperties = {}
        const result = handleEditLiterals(objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
    });

    it('return the object with edited properties.', () => {
        const objectToEdit = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
        }
        const objectProperties = {
            user_avatar: "https://image-edited.png",
            user_confirm_email: true,
        }
        const result = handleEditLiterals(objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal( "https://image-edited.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.true;
    });
});