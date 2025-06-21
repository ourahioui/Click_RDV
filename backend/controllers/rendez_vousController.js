import RendezVous from '../models/rendez_vousModel.js';
import db from '../db.js';

export const getAll = async (req, res) => {
  try {
    const data = await RendezVous.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const getById = async (req, res) => {
  try {
    const rendezVous = await RendezVous.getById(req.params.id);
    if (!rendezVous) return res.status(404).json({ message: 'Non trouvé' });
    res.json(rendezVous);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};
export const create = async (req, res) => {
  const trx = await db.transaction();

  try {
    const { patientId, medecinId, date, heure } = req.body;

    // Créer le rendez-vous
    const [id] = await RendezVous.create({ patientId, medecinId, date, heure }, trx);

    // Supprimer la disponibilité
    await trx('disponibilites')
      .where({ medecinId, date, heureDebut: heure })
      .del();

    // Confirmer les opérations
    await trx.commit();

    const newRdv = await RendezVous.getById(id);
    res.status(201).json(newRdv);

  } catch (err) {
    await trx.rollback();
    console.error('Erreur transactionnelle :', err);
    res.status(500).json({ message: 'Erreur lors de la création du rendez-vous', error: err.message });
  }
};


export const update = async (req, res) => {
  try {
    const count = await RendezVous.update(req.params.id, req.body);
    if (!count) return res.status(404).json({ message: 'Non trouvé' });
    const updated = await RendezVous.getById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: err });
  }
};

export const remove = async (req, res) => {
  try {
    const count = await RendezVous.delete(req.params.id);
    if (!count) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};
