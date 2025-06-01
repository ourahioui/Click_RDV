// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import styles from "./LoginForm.module.css";
 import LoginUser from '../layouts/LoginUser' ; 

export default function LoginPatient() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate() ; 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // TODO: authentification ici
  //   // console.log("Email:", email, "Mot de passe:", password);
  //   const response = await fetch("http://localhost:5000/auth/Login-patient",{
  //     method:"POST" , 
  //     headers: {
  //      'Content-Type': 'application/json',
  //     } , 
  //     body:JSON.stringify({email:email,password:password}) , 
      
  //   }) ;
  //   if(response.ok)
  //   {
  //     alert("connecter avec success") ;
  //     const data = await response.json();
  //     localStorage.setItem("token",data.token) ;  
  //     navigate('/') ;
  //   }



  // };

  // return (
  //   <div className={styles.loginContainer}>
  //     <h2 className={styles.title}>Connexion à votre espace</h2>
  //     <form onSubmit={handleSubmit} className={styles.form}>
  //       <label>Email</label>
  //       <input
  //         type="email"
  //         placeholder="Entrer votre email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         required
  //       />
  
  //       <label>Mot de passe</label>
  //       <input
  //         type="password"
  //         placeholder="Entrer votre mot de passe"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
        
  //       <div className={styles.links}>
  //         <Link to="/forgot-password">Mot de passe oublié ?</Link>
  //       </div>

  //       <button type="submit" className={styles.loginButton}>Se connecter</button>

  //       <div className={styles.signupPrompt}>
  //         Pas encore de compte ? <Link to="/Useregister">Créer un compte</Link>
  //       </div>
  //     </form>
  //   </div>
  // );
  
  // UserRegistrationForm.jsx
 
      
      return (
          <LoginUser RegisterPath="/PatientRegister" LoginPath="Login-patient" SearchTable="patient"/>
          
      )
   
}
