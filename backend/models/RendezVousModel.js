import db from '../db.js';

const RendezVousModel = {
  

  DemandesEnAttente(id) {
   return db('rendez_vous')
  .join('patient', 'rendez_vous.patientId', '=', 'patient.id')
  .join('medecins','rendez_vous.medecinId','=','medecins.id')
  .select(
    'rendez_vous.*',
    'patient.nom as patientNom',
    'patient.prenom as patientPrenom',
    'patient.email as patientEmail' , 
    'patient.tel as tel' , 
    'medecins.nom as medecineNom'
  )
  .where({ medecinId: id ,statut:'EnAttente'});

  },
  DemandesAccepter(id)
  {
  return db('rendez_vous')
  .join('patient', 'rendez_vous.patientId', '=', 'patient.id')
  .select(
    'rendez_vous.*',
    'patient.nom as patientNom',
    'patient.prenom as patientPrenom',
    'patient.email as patientEmail' , 
    'patient.tel as tel'
  )
  .where({ medecinId: id ,statut:'Accepte'});
  } , 

  AccepterDemande(id){
        return db('rendez_vous').where({id:id}).update({statut:"Accepte"})
  } , 
  RefuserDemande(id)
  {
    return db('rendez_vous').where({id:id}).update({statut:"Refuse"}) ;
  }
  
  
  

  
};

export default RendezVousModel;
