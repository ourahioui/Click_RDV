import moment from "moment";
import db from "../db.js";

export const getDisponibilitesParMedecin = async (medecinId) => {
    try {
        const rows = await db('disponibilites')
            .select('date', 'heureDebut')
            .where('medecinId', medecinId)
            .andWhere('date', '>=', db.fn.now())
            .orderBy(['date', 'heureDebut']);

        // Regrouper les horaires par date en format local YYYY-MM-DD
        const grouped = {};
        for (const row of rows) {
            // Utiliser moment pour formater la date localement
            const dateStr = moment(row.date).format('YYYY-MM-DD');

            if (!grouped[dateStr]) {
                grouped[dateStr] = [];
            }

            grouped[dateStr].push({
                heureDebut: row.heureDebut.slice(0, 5) // Format HH:mm
            });
        }

        return grouped; // Retourner les données au lieu d'utiliser res.json()

    } catch (error) {
        console.error('Erreur dans getDisponibilitesParMedecin:', error);
        throw error; // Propager l'erreur pour la gestion dans le contrôleur
    }
};