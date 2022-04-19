import { UserInterface } from "../interfaces";

class UserModel {
    private _users: UserInterface[];
    constructor() {
        this._users = [];
        
    }

    findById(user_id: string) : UserInterface | null{
        return this._users.find(user => user.user_id === user_id) || null;

    }
    createUser(user: UserInterface) : UserInterface {
        this._users.push(user);
        return user;
    }    
    
    getLength() {
        return this._users.length;
    }

    getAll() {
        return this._users;
    }
    
}

export const User = new UserModel();