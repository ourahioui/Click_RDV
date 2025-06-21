import VilleModel from "../models/VilleModel.js";
const VilleController = {
    async getAll(req, res) {
        try {
            const villes = await VilleModel.allvilles();
            res.json(villes);
        } catch (err) {
            console.error('Erreur lors de la récupération des villes:', err);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
};
export default VilleController;