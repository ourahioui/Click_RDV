import React, { useState, useEffect } from 'react';
import {useNavigate,useLocation} from 'react-router-dom' ; 
// import { sendCode, verifyCode } from '../services/api';
// import './styles/Verification.css';

export default function  SendVerificationCode  () {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
 const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate() ;
  const {nom,prenom, email,password,tel}  = formData ; 
 
  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
  
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(()=>{

  },[])

   const handleSubmit = async (e) => {
    e.preventDefault();
     try {
       
        // setMessage('Code vérifié avec succès');
        const response = await fetch("http://localhost:5000/auth/verify-code",{
          method:"POST",
          headers:{
           'Content-Type': 'application/json',
             
          } , 
          body: JSON.stringify({ code ,email }),
          
        }) ;  
        if(response.ok)
        {
          // alert("ok") ; 
          const response = await fetch("http://localhost:5000/auth/register-patient",{
            method:"POST" , 
            headers:{
              "Content-Type":"application/json" , 
            } , 
            body:JSON.stringify({nom,prenom, email,password,tel}) , 
          }) ; 
          if(response.ok)
          {
             alert("inscrit avec succes")  ; 
             const data = await response.json(); // ici tu accèdes à results.email
            localStorage.setItem("email",data.email) ; 
           
            
            navigate('/');
          }
          else  
          {
              console.log(response) ; 
              alert("Erreur : cet email est déjà lié à un autre compte.");
              navigate('/');
          }

        }
        else{
          alert("essayer une autre fois!") ;
        }

 
    } catch (err) {
      console.error(err);
       console.log("Erreur lors de la connexion au serveur") ; 
      // setMessage("Erreur lors de la connexion au serveur");
    }
  };


  const handleResend = async () => {
     setCountdown(120);
     try {
      const response = await fetch('http://localhost:5000/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ email }),
         body: JSON.stringify({ email:formData.email }),

      });
      
    //   const data = await response.json();
   
      
    } catch (err) {
      console.error(err);
       console.log("Erreur lors de la connexion au serveur") ; 
      // setMessage("Erreur lors de la connexion au serveur");
    }
  };

  return (
    <div className="verification-container">
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Entrez le code reçu"
        />
        <button type="submit">Vérifier</button>
        <button 
          type="button" 
          onClick={handleResend}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `Renvoyer (${countdown}s)` : 'Renvoyer le code'}

        </button>
      </form>
    </div>
  );
};
