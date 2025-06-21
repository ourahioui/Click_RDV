 
import  sendVerificationEmail  from '../utils/emailSender.js';
import  generateNumericCode  from '../utils/generateCode.js';
// import Code from '../models/codeModel.js'; 
import mysql from 'mysql';
import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken' ; 
import dotenv from 'dotenv' ; 
import multer from 'multer';
 dotenv.config() ; 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ibrahimKHANTACH2004',
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


 export async function deleteCodeFromDb(email)
 {
       connection.query("delete from codes where email=?",[email]) ;
}

export async function sendVerificationCode(req, res) {
  try {
    const { email } = req.body;

    // Vérifier si l'email est valide (optionnel)
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Générer et enregistrer le code
    const codegenerated = generateNumericCode();
    await deleteCodeFromDb(email);
    await storeCode(email, codegenerated);

    // Envoyer l'email
    await sendVerificationEmail(email, codegenerated);

    // Réponse OK
    return res.status(201).json({ message: "Code envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur dans sendVerificationCode:", error);
    return res.status(500).json({ error: "Erreur d'envoi du code" });
  }
}




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
 export   async function registerPatient(req,res)
 {
    const {nom,prenom, email,password,tel}  = req.body ; 
    const hashedPassword  = await hashPassword( password)  ;

    connection.query("insert into patient(nom,prenom, email,password,tel) values(?,?,?,?,?)",[ nom,prenom,  email,hashedPassword, tel],(err,results)=>{
        if(err){
          deleteCodeFromDb(email);
          console.error(err)  ;
           return res.status(500).json({error:"Erreur lors de l'ajout du patient"}) ;
        }
        deleteCodeFromDb( email) ;
        // return res.status(201).json(results) ;
         const token = jwt.sign({email:  email,id: results.insertId  }, process.env.JWT_SECRET,{expiresIn: "1h",})
        return res.status(201).json({ email:  email ,token:token});
    })
  }
  // ---------------------------------------------------------------------
 
export async  function registerMedecin(req, res) {
 

    const { nom, prenom, email, password, tel, experience, specialite } = req.body;
    const photo = req.file ? req.file.filename : null;
    
    if (!password) {
      return res.status(400).json({ error: 'Mot de passe requis' });
    }

    const hashedPassword = await hashPassword(password);

    const sql = `INSERT INTO medecins(nom, prenom, email, telephone, password, specialite, ville, experience, img_url)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [
      nom, prenom, email, tel, hashedPassword, specialite, 'Casablanca', experience, photo
    ], (err, results) => {
      if (err) {
        deleteCodeFromDb(email);
        console.error("Erreur d'ajout :", err);
        return res.status(500).json({ error: "Erreur lors de l'ajout du médecin" });
      }
      deleteCodeFromDb(email);
      const token = jwt.sign({ email, id: results.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return res.status(201).json({ email, token });
    });
 }

//  ------------------------------------
 async function hashPassword(password)
 {
    const salt = 10 ; 
    const pass =  await bcrypt.hash(password,salt) ;  
    return pass ; 
 }
//  -------------------------------
 function ComparePassword(password,encryptedPass)
 {
    return bcrypt.compare(password, encryptedPass);
 }

//  -------------------------------
export async function LoginPatient(req, res) {
  const { email, password , SearchTable} = req.body;

  connection.query("SELECT * FROM "+ SearchTable+" WHERE email = ?" , [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }
    
    const data = results[0];
    const isMatch = await ComparePassword(password, data.password);
    // const isMatch = await ComparePassword(password, patient.motDePasse);

    if (!isMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { email: data.email, id: data.id },process.env.JWT_SECRET,{ expiresIn: "1h" }
    );
    
    return res.status(200).json({ token });
  });
}
