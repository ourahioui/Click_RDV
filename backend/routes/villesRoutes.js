import express from 'express';
import VilleController from '../controllers/VilleController.js';

const router = express.Router();

router.get('/', VilleController.getAll);


export default router;