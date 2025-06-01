import express from 'express';
import MedecinController from '../controllers/MedecinController.js';

const router = express.Router();

router.get('/', MedecinController.search);
router.get('/:id', MedecinController.getById);
router.post('/', MedecinController.create);
router.put('/:id', MedecinController.update);
router.delete('/:id', MedecinController.delete);

export default router;
