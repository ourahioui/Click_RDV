import PatientModel from '../models/PatientModel.js';
import bcrypt from 'bcrypt' ; 


export   async function getById(req,res)
{
  const {id} = req.body 
try {
       const patient  = await PatientModel.getPatient(id) ; 

       if(!patient)  return res.status(404).json({error: 'patient non trouvé'} ) ;
       res.json(patient)  ; 
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
}
export async function UpdateProfile(req,res)
{
  const {data,id} = req.body ; 
  const password = await hashPassword(data.password);
  data.password = password ;
  try {
  const patient  = await PatientModel.update(id,data) ; 
  if(!patient) return res.status(404).json({error:'err de mettre a jour le profile'}) ; 
  res.json(patient) ; 
   } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
}
 async function hashPassword(password)
 {
    const salt = 10 ; 
    const pass =  await bcrypt.hash(password,salt) ;
    return pass ; 
 }
export async function getPatient(req,res)
{
  const {id} = req.params ; 
  try {
    const patient = await PatientModel.getPatient(id) ;
    if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}