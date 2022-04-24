import axios from "axios";
import { UserInterface } from "../src/interfaces";
import 'dotenv/config';

const api = `${process.env.TEST_API}`;

export const signUp = async (variables: any) => {
    return await axios.post(
        api,
        {
           query: `
           mutation Mutation($userId: String!, $userRoles: [String]!, $userFullname: String!, $userEmail: String!, $userPassword: String!, $userConfirmEmail: Boolean!) {
            signUp(user_id: $userId, user_roles: $userRoles, user_fullname: $userFullname, user_email: $userEmail, user_password: $userPassword, user_confirm_email: $userConfirmEmail) {
              user {
                user_roles
                user_id
                user_fullname
                user_email
                user_avatar
                user_phone
                user_address
                user_postal_code
                user_city
                use_country
                user_payment_method
                user_payment_provider
                user_payment_account_no
                user_payment_expire
                user_confirm_email
                user_basquet
                updated_at
                created_at
              }
              token
            }
          }
            `,
            variables 
        } 
    )
}
