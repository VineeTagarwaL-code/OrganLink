import nodemailer from 'nodemailer'

export class UtilService {
  constructor() {}

  async sendEmail(email: string, randomPass: string) {
    const emailOptions = {
      from: EmailConfig.user,
      to: email,
      subject: `Welcome to Organ Donation Portal`,
      text: `Your credentials are: \n Username: ${email} \n Password: ${randomPass}`,
    }
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EmailConfig.user,
        pass: EmailConfig.pass,
      },
    })

    transporter.sendMail(emailOptions).then(() => {
      console.log('email sent')
      return
    })
  }
}
