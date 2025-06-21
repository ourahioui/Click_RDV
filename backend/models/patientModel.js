import db from '../db.js';

export const getPatientById = async (id) => {
  return await db('patient').where({ id }).first();
};
