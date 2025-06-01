// // server/routes/authRoutes.js
// import express from 'express';
// import { sendVerificationCode,  verifyEmailCode } from '../controllers/authController.js';
// import { validateEmail, validateCode } from '../middlewares/validation.js';
// import { rateLimiter } from '../middlewares/rateLimit.js';

// const router = express.Router();

// // Route pour l'envoi du code de vérification
// router.post('/send-code',rateLimiter, // Limite à 5 requêtes/15min
// validateEmail, // Validation du format email
//   async (req, res) => {
//     try {
//       const { email } = req.body;
      
//       // Génération et envoi du code
//       await sendVerificationCode(email);
      
//       res.json({ 
//         success: true,
//         message: 'Code envoyé avec succès'
//       });

//     } catch (error) {
//       console.error('Erreur send-code:', error);
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Erreur serveur'
//       });
//     }
//   }
// );

// // Route pour la vérification du code
// router.post(
//   '/verify-code',
//   rateLimiter, // Limite à 10 tentatives/heure
//   validateEmail,
//   validateCode, // Validation format code (6 chiffres)
//   async (req, res) => {
//     try {
//       const { email, code } = req.body;

//       // Vérification du code
//       const isValid = await verifyEmailCode(email, code);
      
//       if (!isValid) {
//         return res.status(400).json({
//           success: false,
//           message: 'Code invalide ou expiré'
//         });
//       }

//       // Si vérification réussie
//       res.json({ 
//         success: true,
//         message: 'Email vérifié avec succès'
//       });

//     } catch (error) {
//       console.error('Erreur verify-code:', error);
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Erreur serveur'
//       });
//     }
//   }
// );

// export default router;

import express from 'express';
const router = express.Router();
import {sendVerificationCode,verifyCode,registerPatient,deleteCodeFromDb,LoginPatient,registerMedecin} from '../controllers/authController.js' ; 
// import upload from '../middlewares/multer.js';
import path from 'path' ; 
import multer from 'multer' ; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // dossier où les fichiers sont stockés
  },
  filename: function (req, file, cb) {
     cb(null, file.originalname);
  }
});

const upload = multer({  storage });

 // Route
router.post('/register-medecin', upload.single('photo'),registerMedecin );

router.post('/send-code', sendVerificationCode);
router.post('/verify-code', verifyCode);
router.post('/register-patient',registerPatient) ; 
router.post('/delete-code',deleteCodeFromDb) ; 
router.post('/Login-patient',LoginPatient) ; 
// router.post('/register-medecin' ,registerMedecin) ; 

export default router ; 