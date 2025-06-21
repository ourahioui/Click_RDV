import { getPatientById } from '../models/patientModel.js';

export const getPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient non trouvé' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Erreur récupération patient:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
