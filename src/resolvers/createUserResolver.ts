import { UserInterface } from "../interfaces";
import { User } from "../models"

export const createUser = (args: UserInterface) => {
    return new Promise((resolve, reject) => {
        const result = User.createUser(args);
        resolve({user: result})
    })
}