import express from 'express' ; 
import {getPatient,getById,UpdateProfile} from '../controllers/PatientController.js' ; 

const router = express.Router() ;

router.post('/getUserById',getById) ;
router.post('/UpdateProfile',UpdateProfile) ; 
router.get('/:id', getPatient);
 



export default router;