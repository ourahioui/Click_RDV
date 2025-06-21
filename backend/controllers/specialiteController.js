import SpecialiteModel from "../models/specialiteModel.js";
const SpecialiteController = {
    async getAll(req, res) {
        try {
            const specialites = await SpecialiteModel.allSpecialites();
            res.json(specialites);
        } catch (err) {
            console.error('Erreur lors de la récupération des spécialités:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
};

export default SpecialiteController;