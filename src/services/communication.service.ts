import nodemailer from 'nodemailer'
import fs from 'fs'

class CommunicationService {

    async mailTransporter() {
        console.log(process.env.MAIL_FROM,process.env.MAIL_FROM_PASSWORD,'LLOLK HERE')
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_FROM,
                pass: process.env.MAIL_FROM_PASSWORD
            }
        });
    }

    async sendMail(to: string, subject: string, body: string) {
        try{    
            const payload = {
                from: process.env.MAIL_FROM,
                to,
                subject,
                text: body
            };
            const mailTransporter = await this.mailTransporter();
            await mailTransporter.sendMail(payload);
        } catch(err){
            
        }
    }

}

export default CommunicationService;