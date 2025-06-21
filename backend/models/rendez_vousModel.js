import db from '../db.js';

const RendezVous = {
  getAll: () => db('rendez_vous'),

  getById: (id) => db('rendez_vous').where({ id }).first(),

  create: async (data, trx = db) => {
    return await trx('rendez_vous').insert(data);
  },

  update: (id, data) => db('rendez_vous').where({ id }).update(data),

  delete: (id) => db('rendez_vous').where({ id }).del(),
};

export default RendezVous;
