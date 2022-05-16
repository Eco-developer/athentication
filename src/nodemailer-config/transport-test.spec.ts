import { expect } from 'chai'
import { transporter } from './index';

describe('test nodemailer send message', () => {
    it('return a message id if the message was sended successfully', async () => {
        let info = await transporter.sendMail({
            from: '"Jose Miguel 👻" <josesk8mqc@gmail.com>', // sender address
            to: "miguelthbig_2013@hotmail.com", // list of receivers
            subject: "Test message", // Subject line
            text: "This is a test message.", // plain text body
            html: "<b>This is a test message.</b>", // html body
        });

        expect(info.messageId).to.be.a("string");
    });
});