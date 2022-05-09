import { 
    Schema, 
    model 
} from 'mongoose';
import { UserInterface } from "../interfaces";
import { roles } from  '../const/index';
 
const schema = new Schema<UserInterface>({
    user_id: {
        type: String,
        unique: true,
        required: true,
		trim: true,
    },
    user_roles: {
        type: [String],
        required: true,
        default: [roles.USER],
    },
    user_fullname: {
        type: String,
        required: true,
		trim: true,
    },
    user_email: {
        type: String,
        unique: true,
		required: true,
		trim: true,
    },
    user_password: {
        type: String,
        required: true,
		trim: true,
    },
    user_avatar: {
        type: String,
        trim: true,
        default: '',
    },
    user_phone: {
        type: String,
        trim: true,
        default: '',
    },
    user_address: {
        type: String,
        trim: true,
        default: '',
    },
    user_city: {
        type: String,
        trim: true,
        default: '',
    },
    user_postal_code: {
        type: String,
        trim: true,
        default: '',
    },
    user_country: {
        type: String,
        trim: true,
        default: '',
    },
    user_payment_method: {
        type: String,
        trim: true,
        default: '',
    },
    user_payment_provider: {
        type: String,
        trim: true,
        default: '',
    },
    user_payment_account_no: {
        type: String,
        trim: true,
        default: '',
    },
    user_payment_expire: {
        type: String,
        trim: true,
        default: '',
    },
    user_confirm_email: {
        type: Boolean,
        default: false,
    },
    user_basquet: {
        type: [String],
        default: [],
    }    
}, { timestamps: true });

export const User = model<UserInterface>('User', schema);