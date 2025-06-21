import express from 'express'  ; 
import RendezVousController from '../controllers/RendezVousController.js' ; 

const router = express.Router() ;


// router.get('/:TypeDemandes/:id',RendezVousController.DemandesAccepter)

router.post('/AccepterDemande/:id',RendezVousController.AccepterDemande) ;
router.get('/RefuserDemande/:id',RendezVousController.RefuserDemande) ; 
router.get('/:TypeDemandes/:id',RendezVousController.DemandesEnAttente) ; 
router.post('/SendMessageToPatient',RendezVousController.SendMessageToPatient) ; 
export default router ;
