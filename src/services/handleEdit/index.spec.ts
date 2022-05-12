import { expect } from "chai";
import { handleEdit } from "./index";
import { v4 as uuid } from 'uuid';
import { types } from '../../const/index';

describe('test handleEdit function', () => {
    it('return the object with no property changed.', () => {
        const objectToEdit = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
        }
        const objectProperties = {}
        const result = handleEdit(types.EDIT_LITERAL_PROPERTIES, objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
    });

    it('return the object with no edited properties because type is for array.', () => {
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
        const result = handleEdit(types.EDIT_ARRAY_PROPERTIES, objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
    });

    it('return the object with edited properties other than user_basquet or user_orders.', () => {
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
        const result = handleEdit(types.EDIT_LITERAL_PROPERTIES, objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal( "https://image-edited.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.true;
    });

    it('return the object with no user_basquet or user_orders edited changed.', () => {
        const objectToEdit = {
            user_fullname: "jose quesada", 
            user_avatar: "https://image.png", 
            user_city: "caracas",
            user_confirm_email: false,
            user_basquet: [],
            user_orders: [uuid(), uuid()],
        }
        const objectProperties = {}
        const result = handleEdit(types.EDIT_ARRAY_PROPERTIES, objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
        expect(result.user_basquet).to.have.lengthOf(0);
        expect(result.user_orders).to.have.lengthOf(2);
    });

    it('return the object with no user_basquet or user_orders edited changed because type is for literals not array properties.', () => {
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
        const result = handleEdit(types.EDIT_LITERAL_PROPERTIES, objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
        expect(result.user_basquet).to.have.lengthOf(0);
        expect(result.user_orders).to.have.lengthOf(2);
    });

    it('return the object with user_basquet or user_orders edited.', () => {
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
        const result = handleEdit(types.EDIT_ARRAY_PROPERTIES, objectToEdit, objectProperties);
        expect(result.user_fullname).to.be.equal("jose quesada");
        expect(result.user_avatar).to.be.equal("https://image.png");
        expect(result.user_city).to.be.equal("caracas");
        expect(result.user_confirm_email).to.be.false;
        expect(result.user_basquet).to.have.lengthOf(2);
        expect(result.user_orders).to.have.lengthOf(5);
    });
});