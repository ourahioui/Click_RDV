
import  PatientRegisterForm from '../PatientRegisterForm/PatientRegisterForm'
export default function ProfilePatient({id})
{
    return (
       <PatientRegisterForm isEdit='Mettre a jour' header="Gérer vos informations personnelles" id={id}/>
    )
}