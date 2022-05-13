import { gql } from "apollo-server-express";

export const schema = gql`
    type Query {
        users(user_roles: [String]!, limit: Int, page: Int): PagintedUsers!
        
        user(user_id: String!): User
    }

    type Mutation {
        signUp (
            user_id: String!
            user_roles: [String]!
            user_fullname: String!
            user_email: String!
            user_password: String!
            user_avatar: String
            user_phone: String
            user_address: String
            user_city: String
            user_postal_code: String
            user_country: String
            user_payment_method: String
            user_payment_provider: String
            user_payment_account_no: String
            user_payment_expire: String
            user_confirm_email: Boolean!
        ): SignedUser   
        
        login (
            user_email: String!
            user_password: String!
        ): SignedUser 

        deleteUser (
            user_id: String!
        ): ConfirmDelection!

        updateUser (
            type: String!
            user_id: String!,
            user_fullname: String
            user_email: String
            user_avatar: String
            user_phone: String
            user_address: String
            user_city: String
            user_postal_code: String
            user_country: String
            user_payment_method: String
            user_payment_provider: String
            user_payment_account_no: String
            user_payment_expire: String
            user_confirm_email: Boolean
            user_basquet: [String]
            user_orders: [String]
        ): EditedPropeties
    }

    type User {
        user_id: String!
        user_roles: [String]!
        user_fullname: String!
        user_email: String!
        user_avatar: String
        user_phone: String
        user_address: String
        user_city: String
        user_postal_code: String
        user_country: String
        user_payment_method: String
        user_payment_provider: String
        user_payment_account_no: String
        user_payment_expire: String
        user_confirm_email: Boolean!
        user_basquet: [String]
        user_orders: [String]
        createdAt: Date
        updatedAt: Date
    }

    type UserEditableProperties {
        user_fullname: String
        user_email: String
        user_avatar: String
        user_phone: String
        user_address: String
        user_city: String
        user_postal_code: String
        user_country: String
        user_payment_method: String
        user_payment_provider: String
        user_payment_account_no: String
        user_payment_expire: String
        user_confirm_email: Boolean
        user_basquet: [String]
        user_orders: [String]
    }

    type SignedUser {
        user: User!
        token: String!
    }

    type PagintedUsers {
        users: [User]!
        maxlentgh: Int!
    }

    type ConfirmDelection {
        deleted: Boolean!
    }

    type EditedPropeties {
        type: String!
        edited: UserEditableProperties!
    }

    scalar Date

`