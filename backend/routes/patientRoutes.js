import express from 'express' ; 
import {getById,UpdateProfile} from '../controllers/PatientController.js' ; 

const router = express.Router() ;

router.post('/getUserById',getById) ;
router.post('/UpdateProfile',UpdateProfile) ; 

export default router ; 
import express from 'express';
import { getPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get('/:id', getPatient);

export default router;
