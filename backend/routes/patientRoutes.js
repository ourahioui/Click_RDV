import express from 'express';
import { getPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get('/:id', getPatient);

export default router;
