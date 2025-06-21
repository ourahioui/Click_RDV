import express from 'express' ; 
import {getById,UpdateProfile} from '../controllers/PatientController.js' ; 

const router = express.Router() ;

router.post('/getUserById',getById) ;
router.post('/UpdateProfile',UpdateProfile) ; 

export default router ; 