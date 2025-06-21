import express from 'express';
import {getDisponibilites} from '../controllers/DisponibiliteController.js';

const router = express.Router();

router.get('/',getDisponibilites);


export default router;