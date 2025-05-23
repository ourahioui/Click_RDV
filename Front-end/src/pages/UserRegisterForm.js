// UserRegistrationForm.jsx
import React, { useState } from 'react';
import styles from './RegisterFormUser.module.css';
// import { ReactComponent as MedicalIcon } from './medical-icon.svg';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom' ;
import SendVerificationCode from './SendVerificationCode' ; 

export default function UserRegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'patient',
    birthDate: ''
  });
const navigate = useNavigate() ; 

const handleSubmit =(e)=>{
    e.preventDefault() ; 
    navigate('/SendVerificationCode')  ; 

}
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <MedicalIcon className={styles.logo} /> */}
        <h1>Espace Santé Connectée</h1>
        <p>Créez votre accès sécurisé</p>
      </div>

      <form className={styles.form}>
        {/* Role Selection */}
        <div className={styles.roleSelector}>
          {/* <button 
            type="button"
            className={`${styles.roleCard} ${formData.userType === 'patient' && styles.active}`}
            onClick={() => setFormData({...formData, userType: 'patient'})}
          >
            <FiUser className={styles.roleIcon} />
            <span>Patient</span>
          </button> */}
          
          {/* <button 
            type="button"
            className={`${styles.roleCard} ${formData.userType === 'doctor' && styles.active}`}
            onClick={() => setFormData({...formData, userType: 'doctor'})}
          >
            <FiUser className={styles.roleIcon} />
            <span>Professionnel</span>
          </button> */}
        </div>

        {/* Form Fields */}
        <div className={styles.formGroup}>
          <label>
            <FiUser className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Nom complet"
              required
              className={styles.inputField}
            />
          </label>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Adresse email"
                required
                className={styles.inputField}
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              <FiPhone className={styles.inputIcon} />
              <input
                type="tel"
                placeholder="Téléphone"
                className={styles.inputField}
                pattern="[0-9]{10}"
              />
            </label>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Mot de passe"
                required
                className={styles.inputField}
                minLength="8"
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                placeholder="Confirmation"
                required
                className={styles.inputField}
              />
            </label>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>
              <FiCalendar className={styles.inputIcon} />
              <input
                type="date"
                className={styles.inputField}
                max={new Date().toISOString().split('T')[0]}
              />
            </label>
          </div>
        </div>

        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
          Créer mon compte
          <FiArrowRight className={styles.buttonIcon} />
        </button>

        <div className={styles.footer}>
          <p>En continuant, vous acceptez nos 
            <a href="/conditions">Conditions d'utilisation</a> et 
            <a href="/confidentialite">Politique de confidentialité</a>
          </p>
        </div>
      </form>
    </div>
  );
}