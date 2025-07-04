import React, { useState, useEffect } from 'react';
import {useNavigate,useLocation} from 'react-router-dom' ; 
import { jwtDecode } from 'jwt-decode';
import styles from './SendVerificationCode.module.css';

export default function  SendVerificationCode  () {
    const [code, setCode] = useState('');
    const [countdown, setCountdown] = useState(0);
   
    const location = useLocation();
    const formData = location.state;
    
    const navigate = useNavigate() ;
     

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);
  
  useEffect(()=>{
      
  },[])
 
// --------------------------------
const handleSubmit = async (e) => {
  e.preventDefault();
   
  const formDataToSend = new FormData();
  formDataToSend.append('nom', formData.nom);
  formDataToSend.append('prenom', formData.prenom);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('password', formData.password);
  formDataToSend.append('tel', formData.tel);
  formDataToSend.append('experience', formData.experience);
  formDataToSend.append('specialiteId', formData.specialiteId);
  formDataToSend.append('villeId', formData.villeId);
  formDataToSend.append('photo', formData.photo);  
  
  

  try {
    if(formData.role==="register-patient")
    {
      const res = await fetch('http://localhost:5000/auth/'+formData.role , {  
      method: 'POST',
      
        headers: {
       'Content-Type': 'application/json',
      } , 
       body : JSON.stringify( formData) ,
        
    });
     if (!res.ok) {
      const data = await res.json();
      console.error("Erreur :", data);
      alert("Cet e-mail est déjà utilisé par un autre compte") ;
      // window.location.href = "/";

      navigate("/profile") ; 
    } else {
      const data = await res.json();
      console.log("Succès :", data);
      localStorage.setItem("email",data.email)  ; 
      localStorage.setItem("token",data.token) ; 
 
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      console.log(decoded);
       localStorage.setItem("reloadAcceuille","true") ;
      console.log(localStorage.getItem("reloadAcceuille"))
      alert("Compte créé avec succès") ; 
      
      navigate("/", { replace: true });
      window.location.reload();
    }
    }


    const res = await fetch('http://localhost:5000/auth/'+formData.role , {  
      method: 'POST',
       
       body : formDataToSend ,
        
    });
    if (!res.ok) {
      const data = await res.json();
      console.error("Erreur :", data);
      alert("Cet e-mail est déjà utilisé par un autre compte") ;
      navigate("/") ; 
    } else {
      const data = await res.json();
      console.log("Succès :", data);
      localStorage.setItem("email",data.email)  ; 
      localStorage.setItem("token",data.token) ; 

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
     console.log(decoded);
  
      alert("Compte créé avec succès") ; 
      localStorage.setItem("reloadAcceuille","true") ;
      navigate("/Profile", { replace: true });
      window.location.reload();
      navigate("/") ; 
    }


   
  } catch (err) {
    console.error("Erreur fetch :", err);
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
          body: JSON.stringify({ email:formData.email }),

      });
      
    
      
    } catch (err) {
      console.error(err);
       console.log("Erreur lors de la connexion au serveur") ; 
     }
  };

  return (
<div className={styles.container}>
  <form onSubmit={handleSubmit} className={styles.form}>
    <h2 className={styles.title}>Vérification</h2>
    <input
      type="text"
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Entrez le code reçu"
      className={styles.input}
    />
    <button type="submit" className={styles.buttonPrimary}>
      Vérifier
    </button>
    <button 
      type="button" 
      onClick={handleResend}
      disabled={countdown > 0}
      className={styles.buttonSecondary}
    >
      {countdown > 0 ? `Renvoyer (${countdown}s)` : 'Renvoyer le code'}
    </button>
  </form>
</div>

  );
};
