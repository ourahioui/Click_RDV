import { getById } from '../controllers/PatientController.js';
import db from '../db.js';

const PatientModel = {
   
  
  
  create(data) {
    return db('patient').insert(data);
  },
 
  update(id, data) {
    return db('patient').where({ id }).update(data);
  },

  delete(id) {
    return db('patient').where({ id }).del();
  },

  getPatient(id) {
    return db('patient').where({ id }).first();
  }
  
};

export default PatientModel;

