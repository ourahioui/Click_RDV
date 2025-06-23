 
import express from 'express';
const router = express.Router();
import {sendVerificationCode,verifyCode,registerPatient,deleteCodeFromDb,LoginPatient,registerMedecin} from '../controllers/authController.js' ; 
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
 

export default router ; 