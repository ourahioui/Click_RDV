import express from 'express' ; 
import {getPatient,getById,UpdateProfile} from '../controllers/PatientController.js' ; 

const router = express.Router() ;

router.post('/getUserById',getById) ;
router.post('/UpdateProfile',UpdateProfile) ; 
router.get('/:id', getPatient);
// export default router ; 
// import express from 'express';
// import {  } from '../controllers/patientController.js';

// const router = express.Router();



export default router;