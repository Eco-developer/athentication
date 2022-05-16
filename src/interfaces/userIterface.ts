export interface UserInterface {
    user_id: string;
    user_roles: string[];
    user_fullname: string;
    user_email: string;
    user_password: string;
    user_avatar?: string;
    user_phone?: string;
    user_address?: string;
    user_city?: string;
    user_postal_code?: string;
    user_country?: string;
    user_payment_method?: string;
    user_payment_provider?: string;
    user_payment_account_no?: string;
    user_payment_expire?: string;
    user_confirm_email: boolean;
    user_basquet?: string[];
    user_orders?: string[];
    user_validatetion_pin?: string;
    createdAt?: Date;
    updatedAt?: Date;
}