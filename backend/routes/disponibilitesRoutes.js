import express from 'express';
import {getDisponibilites,ajouterdisponibilites} from '../controllers/DisponibiliteController.js';

const router = express.Router();

router.get('/',getDisponibilites);
router.post('/',ajouterdisponibilites);

export default router;