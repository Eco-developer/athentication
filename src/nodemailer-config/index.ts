import { createTransport } from "nodemailer";
import 'dotenv/config';

const options = {
    host: `${process.env.SEND_GRID_SERVER}`,
    port: +`${process.env.SEND_GRID_PORT}` || 587,
    secure: false,
    auth: {
        user: `${process.env.SEND_GRID_USER_KEY}`,
        pass: `${process.env.SEND_GRID_PASS_KEY}`,
    }
}

export const transporter = createTransport(options);