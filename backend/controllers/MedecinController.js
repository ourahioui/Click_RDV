import MedecinModel from '../models/MedecinModel.js';

import bcrypt from 'bcrypt' ;
const MedecinController = {
async search(req, res) {
    try {
      const medecins = await MedecinModel.search(req.query);
      res.json(medecins);
    } catch (err) {
      console.error('Erreur lors de la recherche de médecins:', err);
      res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
  },


  async getById(req, res) {
    try {
      const medecin = await MedecinModel.findById(req.params.id);
      if (!medecin) return res.status(404).json({ error: 'Médecin non trouvé' });
      res.json(medecin);
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  async create(req, res) {
    try {
      const inserted = await MedecinModel.create(req.body);
      res.status(201).json({ id: inserted[0], message: 'Médecin ajouté' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de l’ajout' });
    }
  }
  , 
  async update(req, res) {
    try {
      const {id} = req.body ; 
      const photo = req.file ? req.file.filename : req.body.photo ;
      req.body.photo  = photo  ;

      if(!req.body.password.startsWith('$2b$'))
      {
           
          req.body.password = await MedecinController.hashPassword(req.body.password) ;
          console.log("hashe avec succès !");
      }
      
      const updated = await MedecinModel.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Médecin non trouvé' });
      res.json({ message: 'Médecin mis à jour' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
  },
  
   async  hashPassword(password)
   {
      const salt = 10 ; 
      const pass =  await bcrypt.hash(password,salt) ;  
      return pass ; 
   } ,
   
  async delete(req, res) {
    try {
      const deleted = await MedecinModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Médecin non trouvé' });
      res.json({ message: 'Médecin supprimé' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
  }
};

export default MedecinController;
