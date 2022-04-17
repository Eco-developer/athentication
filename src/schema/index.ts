import { gql } from "apollo-server-express";

export const schema = gql`
    type Query {
        users: [User!]
        user(user_id: String!): User
    }

    type User {
        user_id: String!
        user_name: String!
    }

`