import { getDisponibilitesParMedecin } from "../models/DisponibiliteModel.js";

export const getDisponibilites = async (req, res) => {
    const { medecinId } = req.query;
    
    try {
        const disponibilites = await getDisponibilitesParMedecin(medecinId);
        res.json(disponibilites);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}