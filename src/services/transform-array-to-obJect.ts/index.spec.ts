import { transformArrayToObject } from "./index";
import { expect } from "chai";

describe('test transformArrayToObject function', () => {
    it('return null because array is empty.', () => {
        
        const result = transformArrayToObject([]);
        expect(result).to.be.null;
    });

    it('return the object with the propeties in the array.', () => {
        const propertiesArray = [
            {user_fullname: "jose quesada"}, 
            {user_avatar: "https://image.png"}, 
            {user_city: "caracas"},
            {user_confirm_email: false},
            {user_basquet: []},
            {user_orders: ["123123123", "12323"]},
        ]
        const object = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
            user_basquet: [],
            user_orders: ["123123123", "12323"],
        }

        const result = transformArrayToObject(propertiesArray);
        expect(result).to.be.eql(object);

    });
});