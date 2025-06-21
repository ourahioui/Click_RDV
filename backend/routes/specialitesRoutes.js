import express from 'express';
import SpecialiteController from '../controllers/specialiteController.js';

const router = express.Router();

router.get('/', SpecialiteController.getAll);


export default router;