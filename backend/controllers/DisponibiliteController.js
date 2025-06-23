import { getDisponibilitesParMedecin,ajouterDisponibilites } from "../models/DisponibiliteModel.js";

export const getDisponibilites = async (req, res) => {
    const { medecinId } = req.query;
    
    try {
        const disponibilites = await getDisponibilitesParMedecin(medecinId);
        res.json(disponibilites);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
export const ajouterdisponibilites = async (req, res) => {
    const disponibilites = req.body;

    try {
        await ajouterDisponibilites(disponibilites);
        res.status(201).json({ message: 'Disponibilités ajoutées avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout des disponibilités:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}