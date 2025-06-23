import RendezVousModel from '../models/RendezVousModel.js' ; 
import sendVerificationEmail from '../utils/emailSender.js' ; 
import db from '../db.js' ;
const RendezVousController = {
    async DemandesEnAttente(req,res)
    {
            const {id,TypeDemandes} = req.params  ;
            if(TypeDemandes !== "DemandesAccepter")
            {
                     const appointments = await  RendezVousModel.DemandesEnAttente(id)
                     res.json(appointments)  ;
            }
            else
            {
                 const id = req.params.id ; 
                 const appointments = await RendezVousModel.DemandesAccepter(id) ; 
                 return res.json(appointments)
            }
           
    } , 
    async AccepterDemande(req,res)
    {
        const id = req.params.id  ;
        const {patientEmail,patientNom,patientPrenom,date,Heure,medecineNom,medecinePrenom} = req.body ; 
        const Message= null ;
        const code = null; 
        const subject = 'demande de rendez vous est  accepter'  ; 
        await  RendezVousModel.AccepterDemande(id)
         const result = sendVerificationEmail(patientEmail,subject,patientNom,Message,date,Heure,medecineNom,code,medecinePrenom,patientPrenom) ; 

        res.json(result)  ;
    } , 
    async RefuserDemande(req,res)
    {
        const id = req.params.id  ;
        const result = await  RendezVousModel.RefuserDemande(id)
        res.json(result)  ;
    },
    async SendMessageToPatient(req,res)
    {
       const {patientEmail,patientNom,patientPrenom,Message,medecineNom,medecinePrenom} = req.body ;
       const subject = 'Message important du médecin'  ; 
       const date = null ;
       const Heure = null ; 
       const code = null  ;

       const result = await sendVerificationEmail(patientEmail,subject,patientNom,Message,date,Heure,medecineNom,code,medecinePrenom,patientPrenom) ; 
       return res.json(result) ; 
    }   ,
getAll: async (req, res) => {
    try {
        const data = await RendezVousModel.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
},

getById: async (req, res) => {
    try {
        const rendezVous = await RendezVousModel.getById(req.params.id);
        if (!rendezVous) return res.status(404).json({ message: 'Non trouvé' });
        res.json(rendezVous);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
},

create: async (req, res) => {
    // Assurez-vous que 'db' est importé si utilisé ici
    const trx = await db.transaction();

    try {
        const { patientId, medecinId, date, heure } = req.body;

        // Créer le rendez-vous
        const [id] = await RendezVousModel.create({ patientId, medecinId, date, heure }, trx);

        // Supprimer la disponibilité
        await trx('disponibilites')
            .where({ medecinId, date, heureDebut: heure })
            .del();
           
        // Confirmer les opérations
        await trx.commit();

        const newRdv = await RendezVousModel.getById(id);
        res.status(201).json(newRdv);

    } catch (err) {
        await trx.rollback();
        console.error('Erreur transactionnelle :', err);
        res.status(500).json({ message: 'Erreur lors de la création du rendez-vous', error: err.message });
    }
},

update: async (req, res) => {
    try {
        const count = await RendezVousModel.update(req.params.id, req.body);
        if (!count) return res.status(404).json({ message: 'Non trouvé' });
        const updated = await RendezVousModel.getById(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de mise à jour', error: err });
    }
},

remove: async (req, res) => {
    try {
        const count = await RendezVousModel.delete(req.params.id);
        if (!count) return res.status(404).json({ message: 'Non trouvé' });
        res.json({ message: 'Supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
},
getByPatientId: async (req, res) => {
    try {
        const rendezVous = await RendezVousModel.getByPatientId(req.params.id);
        if (!rendezVous) return res.status(404).json({ message: 'Non trouvé' });
        res.json(rendezVous);
    } catch (err) {
        console.error("Erreur lors de la récupération des rendez-vous par patient ID :", err);
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
}


}
 
export default RendezVousController ;