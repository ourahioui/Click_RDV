
import RendezVousModel from '../models/RendezVousModel.js' ; 
import sendVerificationEmail from '../utils/emailSender.js' ; 
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
    // async DemandesAccepter(req,res)
    // {
    //     const id = req.params.id ; 
    //     const appointments = await RendezVousModel.DemandesAccepter(id) ; 
    //     return res.json(appointments)
    // } ,
    async AccepterDemande(req,res)
    {
        const id = req.params.id  ;
        const {patientEmail,patientNom,date,Heure,medecineNom} = req.body ; 
        const Message= null ;
        const code = null; 
        const subject = 'demande de rendez vous est  accepter'  ; 
        await  RendezVousModel.AccepterDemande(id)
         const result = sendVerificationEmail(patientEmail,subject,patientNom,Message,date,Heure,medecineNom,code) ; 

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
       const {patientEmail,patientNom,Message} = req.body ;
       const subject = 'Message important du médecin'  ; 
       const result = await sendVerificationEmail(patientEmail,subject,patientNom,Message) ; 
       return res.json(result) ; 
    }   
}
 
export default RendezVousController ;