export interface UserInterface {
    user_id: string;
    user_fullname: string;
    user_email: string;
    user_password: string;
    user_avatar?: string;
    user_address?: string;
    user_confirm_email?: boolean;
}