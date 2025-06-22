import { useState,useEffect } from 'react'
import { FiPlus, FiEdit, FiTrash2, FiEye,FiSend,FiX } from 'react-icons/fi'
import '../components/rendez-vous.css' ;
const RendezVousTab = ({ id ,TypeDemandes}) => {
  const [appointments, setAppointments] = useState([]) ; 
  const [ShowMessageInput,setShowMessageInput] = useState(false) ;
  const [messageInput, setMessageInput] = useState({});
  
  useEffect(()=>{
    console.log(TypeDemandes) ;
      const  fetchData = async ()=>{
         
          const response = await fetch(`http://localhost:5000/RendezVous/${TypeDemandes}/${id}`) ;
          if(response.ok)
            {
              //  alert("ok")
              const data = await response.json() ; 
                setAppointments(data)  ;
                // console.log(appointments) ;
              
            } 
            else
            {
              alert("not ok")
            }

      }
      fetchData() ;
       
  },[])
 
// ---------------------------------------
const handleAccepter = async(id,patientEmail,patientNom,date,Heure,medecineNom)=>{
 
    const response = await fetch(`http://localhost:5000/RendezVous/AccepterDemande/${id}`,{
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({ 
         patientEmail :patientEmail, 
         patientNom:patientNom ,
         date:date,
         Heure :Heure,
         medecineNom:medecineNom
      })
    }) ;
          if(response.ok)
            {
              
              const data  = appointments.filter((appointment)=>appointment.id !==id); 
              setAppointments(data)  ;
           
              
            } 
            else
            {
              alert("not ok")
            }

}
// -------------------------------------------------------

const handleRefuser = async(id)=>{
    const response = await fetch(`http://localhost:5000/RendezVous/RefuserDemande/${id}`) ;
          if(response.ok)
            {
              
              const data  = appointments.filter((appointment)=>appointment.id !==id); 
              setAppointments(data)  ;
         
              
            } 
            else
            {
              alert("not ok")
            }

}
// --------------------------------------------------------------
 const handleCloseMessage = (appointmentId) => {
  setMessageInput(prev => ({
    ...prev,
    [appointmentId]: {
      ...prev[appointmentId],
      visible: false
    }
  }));
  console.log(messageInput);
};
// ----------------------------------------------------------------
const handleMessageChange = (appointmentId, value)=>{
   setMessageInput({...messageInput,
    [appointmentId]:{
      ...messageInput[appointmentId] , 
      content:value
    }

   })
  //  console.log(messageInput[appointmentId] ) ; 
}
// ------------------------------------------------------
const handleSubmitMessage = async(appointmentId,patientEmail,patientNom)=>{
    setMessageInput({...messageInput,
      [appointmentId]:{
        ...messageInput[appointmentId] ,
        sending:true
      }
    }) ; 
    const response = await fetch("http://localhost:5000/RendezVous/SendMessageToPatient",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({ 
        Message: messageInput[appointmentId].content , 

        patientNom:patientNom,
        patientEmail:patientEmail 
      })
     }
     

    )
    if(response.ok)
    {
      alert("message envoyer") ; 
      setMessageInput({...messageInput,
      [appointmentId]:{
        ...messageInput[appointmentId] ,
        sending:false ,
        visible:false
      }
    }) ; 
     

    }
    else{
      alert("err lors d'envois de message") ; 
    }
      
    
}
// -----------------------------------------------------
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
// ------------------------------------------------------
 const handleSendMessage = (appointmentId) => {
    setMessageInput({
      ...messageInput,
      [appointmentId]: {
        visible: true,
        content: '',
        sending: false
      }
    });
  };
// ---------------------------------------------------------
  
    return (
      <div className="appointments-view">
        <h2>les demandes de Rendez-vous</h2>
        {appointments.length === 0 ? (
          <div className="empty-state">
            <p>Aucun rendez-vous demander</p>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{appointment.patientNom} {appointment.patientPrenom} </h3>
                  
                </div>

                <div className="appointment-details">
                  <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
                  <p><strong>Heure:</strong> {appointment.Heure}</p>
                  <p><strong>📧 Email de patient :</strong> {appointment.patientEmail}</p>
                   <p><strong>📞 Téléphone de patient </strong> {appointment.tel}</p> 
                </div>
                
                {TypeDemandes !== "DemandesAccepter" ?(
                  <div>
                    <button onClick={() => handleAccepter(appointment.id,appointment.patientEmail,appointment.patientNom,appointment.date,appointment.Heure,appointment.medecineNom)}>Accepter</button>
                    <button onClick={() => handleRefuser(appointment.id)}>Refuser</button>
                  </div>
                ):
                (
                     <div className="message-section">
                  <button 
                    className="message-btn"
                    onClick={() => handleSendMessage(appointment.id)}
                  >
                    <FiSend /> Envoyer un message
                  </button>
                  
                  {messageInput[appointment.id]?.visible && (
                    <div className="message-input-container">
                      <textarea
                        value={messageInput[appointment.id].content}
                        onChange={(e) => handleMessageChange(appointment.id, e.target.value)}
                        placeholder="Écrivez votre message ici..."
                        rows="3"
                      />
                      <div className="message-actions">
                        <button
                          className="send-btn"
                          onClick={() => handleSubmitMessage(appointment.id,appointment.patientEmail,appointment.patientNom)}
                          disabled={messageInput[appointment.id].sending}
                        >
                          {messageInput[appointment.id].sending ? 'Envoi...' : 'Envoyer'}
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCloseMessage(appointment.id)}
                        >
                          <FiX /> Annuler
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
                
                
              </div>
             
            ))}
          </div>
        )}
      </div>
    )


 
}

export default RendezVousTab

