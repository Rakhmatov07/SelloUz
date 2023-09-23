import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer-smtp-transport';

const ownEmail = process.env.OWN_EMAIL;
const emailPass = process.env.EMAIL_PASS;

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      SMTPTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: ownEmail,
          pass: emailPass,
        },
      }),
    );
  }

  async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: ownEmail,
        to,
        subject,
        text,
        html,
      });
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
