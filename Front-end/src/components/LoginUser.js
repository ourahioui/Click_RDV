// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: authentification ici
    console.log("Email:", email, "Mot de passe:", password);
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
          Pas encore de compte ? <Link to="/Useregister">Créer un compte</Link>
        </div>
      </form>
    </div>
  );
}
