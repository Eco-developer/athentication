import { expect } from "chai";
import { transformObjectToArray } from "./index";

describe('test transformObjectToArray function', () => {
    it('return null is no object was passed as argument.', () => {
        
        const array = transformObjectToArray({});
        expect(array).to.be.null;
    });

    it('return an array of objects with keys and values.', () => {
        const data = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas"
        }
        
        const array = transformObjectToArray(data) || [];
        
        expect(array).to.have.lengthOf(3);
        expect(array[0]).to.have.property("user_fullname");
        expect(array[1]).to.have.property("user_avatar");
        expect(array[2]).to.have.property("user_city");
        expect(array[0].user_fullname).to.be.equal("jose quesada");
    });
});