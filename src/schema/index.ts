import { gql } from "apollo-server-express";

export const schema = gql`
    type Query {
        users: [User!]
        user(user_id: String!): User
    }

    type Mutation {
        createUser(user: User!) User!
    }

    type User {
        user_id: String!
        user_fullname: String!
        user_email: String!
        user_password: String!
        user_avatar?: String!
        user_address?: String!
        user_confirm_email?: Boolean!
    }

`