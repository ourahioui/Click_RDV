import express from 'express'  ; 
import RendezVousController from '../controllers/RendezVousController.js' ; 

const router = express.Router() ;


// router.get('/:TypeDemandes/:id',RendezVousController.DemandesAccepter)
router.get('/', RendezVousController.getAll);
router.get('/:id', RendezVousController.getById);
router.post('/', RendezVousController.create);
router.put('/:id', RendezVousController.update);
router.delete('/:id', RendezVousController.remove);
router.get('/ByPatientId/:id', RendezVousController.getByPatientId);
router.post('/AccepterDemande/:id',RendezVousController.AccepterDemande) ;
router.get('/RefuserDemande/:id',RendezVousController.RefuserDemande) ; 
router.get('/:TypeDemandes/:id',RendezVousController.DemandesEnAttente) ; 
router.post('/SendMessageToPatient',RendezVousController.SendMessageToPatient) ; 
export default router ;