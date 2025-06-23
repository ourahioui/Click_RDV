// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import styles from "../components/LoginForm.module.css";
import { jwtDecode } from 'jwt-decode';

export default function Login({RegisterPath,LoginPath,SearchTable}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate() ; 
  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const response = await fetch("http://localhost:5000/auth/"+LoginPath,{
      method:"POST" , 
      headers: {
       'Content-Type': 'application/json',
      } , 
      body:JSON.stringify({email:email,password:password,SearchTable:SearchTable}) , 
      
    }) ;
    if(response.ok)
    {
      alert("connecter avec success") ;
      const data = await response.json();
      localStorage.setItem("email",data.email)  ;
      localStorage.setItem("token",data.token) ; 
       const token = localStorage.getItem("token");
       const decoded = jwtDecode(token); 
       console.log(decoded);
       localStorage.setItem("reloadAcceuille","true") ;
        console.log(localStorage.getItem("reloadAcceuille"));

        navigate("/profile", { replace: true });
        
        window.location.reload();

            
    }
    else
    {
      alert("email ou mot de passe incorrect")
    }



  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Connexion à votre espace</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Entrer votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Entrer votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className={styles.links}>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </div>

        <button type="submit" className={styles.loginButton}>Se connecter</button>

        <div className={styles.signupPrompt}>
          Pas encore de compte ? <Link to={`${RegisterPath}`}>Créer un compte</Link>

        </div>
      </form>
    </div>
  );
}
