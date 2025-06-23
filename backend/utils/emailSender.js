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
// -----------------------------
const MédecinMessageTemplate = (patientNom, Meassage) => `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <!-- En-tête -->
  <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
    <h2 style="color: white; margin: 0; font-weight: 500;">Message de votre médecin</h2>
  </div>
  
  <!-- Corps du message -->
  <div style="padding: 30px;">
    <p style="font-size: 16px; line-height: 1.6; color: #202124; margin-top: 0;">
      Bonjour <strong>${patientNom}</strong>,
    </p>
    
    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #1a73e8;">
      <p style="font-size: 16px; line-height: 1.6; color: #202124; margin: 0;">
        ${Meassage}
      </p>
    </div>
    
    <p style="font-size: 14px; color: #5f6368; margin-bottom: 25px;">
      Ce message vous a été envoyé par votre équipe médicale.
    </p>
    
    <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
      <p style="font-size: 14px; color: #5f6368; margin: 5px 0;">
        Cordialement,<br>
        <strong>Votre équipe médicale</strong>
      </p>
    </div>
  </div>
  
  <!-- Pied de page -->
  <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #5f6368; border-top: 1px solid #e0e0e0;">
    <p style="margin: 5px 0;">
      Veuillez ne pas répondre à ce message automatique. Pour toute question, contactez-nous via votre espace patient.
    </p>
  </div>
</div>
`;
// ----------------------------------------------------------------
const demandeAccepteeTemplate = (patientNom, date, Heure, medecineNom)=>{

    
  const dateObj = new Date(date) ; 
  const formattedDaate = dateObj.toLocaleString('fr',{
    weekday:'long' , 
    day:'2-digit' , 
    month:'long'  , 
    year:'numeric'
  })
  
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; text-align: center;">
  <div style="margin-bottom: 20px;">
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #4CAF50;">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
    </svg>
  </div>
  
  <h2 style="color: #2E7D32; margin-bottom: 10px;">Demande de rendez-vous acceptée</h2>
  
  <p style="font-size: 16px; margin-bottom: 25px;">
    Bonjour ${patientNom},<br>
    Votre demande de rendez-vous a été acceptée par le Dr ${medecineNom}.
  </p>
  
  <div style="background-color: #E8F5E9; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
    <p style="font-size: 18px; font-weight: bold; margin: 5px 0; color: #1B5E20;">
      📅 ${formattedDaate}
    </p>
    <p style="font-size: 18px; font-weight: bold; margin: 5px 0; color: #1B5E20;">
      ⏰ ${Heure}
    </p>
  </div>
  
  <p style="font-size: 14px; color: #616161;">
    Vous recevrez un rappel 24h avant votre rendez-vous.
  </p>
</div>
`};

 
// -------------------------------------------

function generateTemplate (subject,code,patientNom,Meassage,medecineNom,date,Heure)
{
  if(subject==='Code de vérification')
  {
    console.log('code de veri') ;
    return verificationTemplate(code)
  }
  if(subject==='Message important du médecin')
  {
    console.log('Message medecin') ;
    return  MédecinMessageTemplate(patientNom,Meassage) ; 
  }
  if(subject==='demande de rendez vous est  accepter')
  {
     
    return  demandeAccepteeTemplate(patientNom, date, Heure, medecineNom) ; 
  }
} ;

// Fonction d'envoi d'email
const sendVerificationEmail = async (to=null,subject, patientNom=null,Meassage=null,date,Heure,medecineNom,code=null) => {

      const Template = generateTemplate(subject,code,patientNom,Meassage,medecineNom,date,Heure) ; 
      console.log("🧪 Sujet reçu:", subject);
        if (!Template) throw new Error("Template non généré, sujet invalide");

  try {
    const info = await transporter.sendMail({
      from: `"${"mohamedourahioui@gmail.com" || 'Votre Application'}" <${"mohamedourahioui@gmail.com"}>`,
      to:to, 
      subject: subject ,
       
      html: Template
      
    });

    console.log('Message envoyé: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Échec de l\'envoi de l\'email');
  }
};


export default sendVerificationEmail ; 