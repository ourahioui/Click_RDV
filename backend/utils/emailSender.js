import nodemailer from 'nodemailer' ; 
import dotenv from 'dotenv' ;

dotenv.config();

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:  587,
  secure: false, // true pour le port 465
  auth: {
    user: "fabrigassourahioui@gmail.com",
    pass: "ggxq evfn mwhl givh"
  },
  tls: {
    rejectUnauthorized: false // Pour les environnements de développement
  }
});

// Template HTML pour l'email de vérification
const verificationTemplate = (code) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px;">
      <h2 style="color: #2d3748;">Vérification de votre compte</h2>
      <p style="font-size: 16px; color: #4a5568;">
        Utilisez le code suivant pour vérifier votre adresse email :
      </p>
      <div style="background-color: #edf2f7; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; letter-spacing: 2px; color: #2d3748;">${code}</span>
      </div>
      <p style="font-size: 14px; color: #718096;">
        Ce code expirera dans 15 minutes.
      </p>
    </div>
  </div>
`;

// Fonction d'envoi d'email
const sendVerificationEmail = async (to, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"${"mohamedourahioui@gmail.com" || 'Votre Application'}" <${"mohamedourahioui@gmail.com"}>`,
      to,
      subject: 'Code de vérification',
      text: `Votre code de vérification est : ${code}`,
      html: verificationTemplate(code)
    });

    console.log('Message envoyé: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Échec de l\'envoi de l\'email');
  }
};

export default sendVerificationEmail ; 