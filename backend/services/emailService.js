import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = (email, code) => {
  return transporter.sendMail({
    from: '"Mon Application" <no-reply@example.com>',
    to: email,
    subject: 'Code de vérification',
    html: `<b>Votre code : ${code}</b>`
  });
};