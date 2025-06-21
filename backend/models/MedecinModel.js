import db from '../db.js';

const MedecinModel = {
  search({ specialite, ville }) {
    let query = db('medecins').join('specialites', 'medecins.specialiteID', 'specialites.id')
    .join("villes","medecins.villeID", "villes.id");
    
    if (specialite) query.where('specialite', 'like', `%${specialite}%`);
    if (ville) query.where('ville', 'like', `%${ville}%`);
    query.select('medecins.*', 'specialites.specialite', 'villes.ville');
    return query;
  },

  findById(id) {
    return db('medecins').where({ id }).first();
  },

  create(data) {
    return db('medecins').insert(data);
  },

  update(id, data) {
    return db('medecins').where({ id }).update(data);
  },

  delete(id) {
    return db('medecins').where({ id }).del();
  }
};

export default MedecinModel;
