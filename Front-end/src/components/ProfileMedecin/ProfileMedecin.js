

import MedecinRegister from '../MedecinRegister/MedecinRegister' ; 
export default function ProfileMedecin({id})
{
    return (
        <MedecinRegister isEdit='Mettre a jour' header="Gérer vos informations personnelles" id={id}/>
    )
}