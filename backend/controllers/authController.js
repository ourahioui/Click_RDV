// import pool from '../config/db.js';
// import { sendVerificationEmail } from '../services/emailService.js';
// import { generateToken, verifyToken } from '../services/jwtService.js';

// export const sendVerificationCode = async (email) => {
//   const code = Math.floor(100000 + Math.random() * 900000);
//   const token = generateToken({ email, code });
  
//   await pool.execute(
//     `INSERT INTO users (email, verification_code)
//      VALUES (?, ?)
//      ON DUPLICATE KEY UPDATE verification_code = ?`,
//     [email, code, code]
//   );

//   await sendVerificationEmail(email, code);
//   return token;
// };

// export const verifyEmailCode = async (email, code) => {
//   const [rows] = await pool.execute(
//     `SELECT verification_code FROM users WHERE email = ?`,
//     [email]
//   );
  
//   return rows[0]?.verification_code === code;
// };
// const { sendEmail } = require('../utils/emailSender');


import  sendVerificationEmail  from '../utils/emailSender.js';
import  generateNumericCode  from '../utils/generateCode.js';
// import Code from '../models/codeModel.js'; 
import mysql from 'mysql';
import bcrypt from 'bcrypt' ;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rdv'
});
// Stocker les codes en base de données
const storeCode = (email, code) => {
  return new Promise((resolve, reject) => {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes plus tard
    const formattedDate = expiresAt.toISOString().slice(0, 19).replace('T', ' '); // Format MySQL DATETIME
    connection.query(
      "INSERT INTO codes(email, code,expires_at) VALUES(?, ?,?)",
      [email, code,formattedDate],
      (err, results) => {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          return reject(err);
        }
        console.log("Code stocké avec succès !");
        resolve(true);
      }
    );
  });
};




export   async function sendVerificationCode  (req, res){
  // try {
    const { email } = req.body;
    const codegenerated = generateNumericCode(); // Génère un code à 6 chiffres
    
    await storeCode( email , codegenerated)
//     if (err) {
//     return res.status(500).json({ error: "Erreur d'enregistrement du code" });
//     }
//   return res.json({ message: "Code envoyé avec succès !" });
   
// });

    await sendVerificationEmail(email,codegenerated);
    
    // res.json({ success: true });
  // } catch (error) {
  //   res.status(500).json({ error: "Erreur d'envoi du code" });
  // }

  return res.status(201).json(codegenerated) ; 
   
};



export function verifyCode(req, res) {
  const {  code ,email} = req.body;

  // Vérifie si le code existe pour cet email
  connection.query('SELECT * FROM codes WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête :', err);
      return res.status(500).json({ error: 'Erreur de vérification' });
    }

    if (results.length === 0 || results[0].code !== code) {
      return res.status(400).json({ error: 'Code invalide' });
    }

    // const now = new Date();
    // const expiresAt = new Date(results[0].expires_at);
    
    // if (expiresAt < now) {
    //   return res.status(400).json({ error: 'Code expiré' });
    // }
    
    // Si tout est bon
    res.json({ success: results });
  });
 }
//  -------------------------------
 
//  -------------------------------
 export   async function registerPatient(req,res)
 {
    const {nom,prenom, email,password,tel}  = req.body ; 
    const hashedPassword  =await hashPassword(password)  ;

    connection.query("insert into patient(nom,prenom, email,password,tel) value(?,?,?,?,?)",[nom,prenom, email,hashedPassword,tel],(err,results)=>{
        if(err){
          console.error("err d'ajout un nouveau patient")  ;
           return res.status(500).json({ error: 'Errer dajout un nouveau patient' });
        }
        connection.query("delete from codes where email=?",[email])
        return res.status(201).json(results.insertId);
    })
    // return res.json({data:hashedPassword}) ; 
 }
//  ------------------------------------
 async function hashPassword(password)
 {
    const salt = 10 ; 
    const pass =  await bcrypt.hash(password,salt) ;  
    return pass ; 
 }