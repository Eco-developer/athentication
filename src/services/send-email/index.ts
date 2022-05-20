import axios from "axios";
import { createEmail } from "../create-email-template";
import 'dotenv/config';

export const sendMail = async (from: string, to: string, subject: string, contentText: string, path: string, variables: any) => {
    try {
        const template = createEmail(path, variables);
        if (template.error) {
            throw new Error("The email could not be crated");
        }
        const mailData = {
            from, // sender address
            to, // list of receivers
            subject, // Subject line `Hi ${restsigned.user_fullname}, please verify your account`,
            contentText, // plain text body
            contentHtml: template.data, // html body
        }

        const response = await axios.post(
            `${process.env.MAIL_MICROSERVICE}`,
            mailData
        ) 
        const { 
            data 
        } = response;
        console.log(data)
        return {
            data,
            error: false,
        }
    } catch (error:any) {
        console.log(error)
        return {
            data: false,
            error: true,
            message: error.message,
        }
    }
}