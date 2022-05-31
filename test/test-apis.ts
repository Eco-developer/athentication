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
              user_country
              user_payment_method
              user_payment_provider
              user_payment_account_no
              user_payment_expire
              user_confirm_email
              user_basquet
              user_orders
            }
            token
          }
        }
          `,
          variables 
      } 
  )    
}

export const login = async (variables: any) => {
  return await axios.post(
      api,
      {
          query: `
          mutation Mutation($userEmail: String!, $userPassword: String!) {
            login(user_email: $userEmail, user_password: $userPassword) {
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
                user_country
                user_payment_method
                user_payment_provider
                user_payment_account_no
                user_payment_expire
                user_confirm_email
                user_basquet
                user_orders
              }
              token
            }
          }
          `,
          variables 
      } 
  )    
}

export const deleteUser = async (variables: any, token: string = "") => {
  return await axios.post(
      api,
      {
          query: `
          mutation Mutation($userId: String!) {
            deleteUser(user_id: $userId) {
              deleted
            }
          }
          `,
          variables 
      },
      { headers: { "x-data-token": token } }
  )    
}

export const verifyEmail = async (variables: any, token: string = "") => {
  return await axios.post(
      api,
      {
          query: `
          mutation Mutation($userId: String!, $userValidatetionPin: String!) {
            verifyEmail(user_id: $userId, user_validatetion_pin: $userValidatetionPin) {
              verified
            }
          }
          `,
          variables 
      },
      { headers: { "x-data-token": token } }
  )    
}

export const updateUser = async (variables: any, token: string = "") => {
  return await axios.post(
      api,
      {
          query: `
          mutation UpdateUser($type: String!, $userId: String!, $userFullname: String, $userEmail: String, $userAvatar: String, $userPhone: String, $userAddress: String, $userCity: String, $userCountry: String, $userPostalCode: String, $userPaymentMethod: String, $userPaymentProvider: String, $userPaymentAccountNo: String, $userPaymentExpire: String, $userConfirmEmail: Boolean, $userBasquet: [String], $userOrders: [String]) {
            updateUser(type: $type, user_id: $userId, user_fullname: $userFullname, user_email: $userEmail, user_avatar: $userAvatar, user_phone: $userPhone, user_address: $userAddress, user_city: $userCity, user_country: $userCountry, user_postal_code: $userPostalCode, user_payment_method: $userPaymentMethod, user_payment_provider: $userPaymentProvider, user_payment_account_no: $userPaymentAccountNo, user_payment_expire: $userPaymentExpire, user_confirm_email: $userConfirmEmail, user_basquet: $userBasquet, user_orders: $userOrders) {
              edited {
                user_fullname
                user_email
                user_avatar
                user_orders
                user_basquet
                user_confirm_email
                user_payment_expire
                user_payment_account_no
                user_payment_provider
                user_payment_method
                user_postal_code
                user_country
                user_city
                user_phone
                user_address
              }
              type
            }
          }
          `,
          variables 
      },
      { headers: { "x-data-token": token } }
  )    
}

export const queryUser = async (variables: any, token: string = "") => {
  return await axios.post(
      api,
      {
        query: `
          query User($userId: String!) {
            user(user_id: $userId) {
              user_id
              user_roles
              user_fullname
              user_email
              user_avatar
              user_phone
              user_address
              user_city
              user_postal_code
              user_country
              user_payment_method
              user_payment_provider
              user_payment_account_no
              user_payment_expire
              user_confirm_email
              user_basquet
              user_orders
              createdAt
              updatedAt
            }
          }
        `,
        variables
      },
      { headers: { "x-data-token": token } }
  )
}

export const queryUsers = async (variables: any, token: string = "") => {
  return await axios.post(
      api,
      {
        query: `
          query Users($userRoles: [String]!, $limit: Int, $page: Int) {
           users(user_roles: $userRoles, limit: $limit, page: $page) {
              users {
                user_id
                user_roles
                user_fullname
                user_email
                user_avatar
                user_phone
                user_address
                user_city
                user_postal_code
                user_country
                user_payment_method
                user_payment_provider
                user_payment_account_no
                user_payment_expire
                user_confirm_email
                user_orders
                createdAt
                updatedAt
              }
              maxlentgh
            }
          }
        `,
        variables
      },
      { headers: { "x-data-token": token } }
  )
}