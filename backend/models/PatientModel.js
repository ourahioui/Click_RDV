import db from '../db.js';

const PatientModel = {
   
  
  findById(id) {
    return db('patient').where({ id }).first();
  },
  
  create(data) {
    return db('patient').insert(data);
  },
 
  update(id, data) {
    return db('patient').where({ id }).update(data);
  },

  delete(id) {
    return db('patient').where({ id }).del();
  }
};

export default PatientModel;
