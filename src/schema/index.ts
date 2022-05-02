import { gql } from "apollo-server-express";

export const schema = gql`
    type Query {
        users: [User!]
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
            use_country: String
            user_payment_method: String
            user_payment_provider: String
            user_payment_account_no: String
            user_basquet: [String]
            user_payment_expire: String
            user_confirm_email: Boolean!
        ): SignedUser   
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
        use_country: String
        user_payment_method: String
        user_payment_provider: String
        user_payment_account_no: String
        user_payment_expire: String
        user_confirm_email: Boolean!
        user_basquet: [String]
        createdAt: Date
        updatedAt: Date
    }

    type SignedUser {
        user: User!
        token: String!
    }

    scalar Date

`