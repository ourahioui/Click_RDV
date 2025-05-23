// UserRegistrationForm.jsx
import React, { useState } from 'react';
import styles from './RegisterFormUser.module.css';
// import { ReactComponent as MedicalIcon } from './medical-icon.svg';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom' ;
// import SendVerificationCode from '../components/SendVerificationCode.js' ; 
import SendVerificationCode from './SendVerificationCode.js' ; 

export default function UserRegisterForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom:'' , 
    email: '',
    password: '',
    Confirmation: '',
    tel: '',
    birthDate: ''
  });
  const [showVerification, setShowVerification] = useState(false);
  const [SubmitButton , setSubmitButton] = useState(false) ; 

// const navigate = useNavigate() ; 

const handleSubmit = async (e)=>{
    e.preventDefault() ; 
    setSubmitButton(true)  ; 

    // navigate('/SendVerificationCode')  ;
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
    setShowVerification(true)  ; 
  };
 




const handleChange =(e)=>{
//    const {name,value} = e.target ; 
  setFormData({...formData,[e.target.name]:e.target.value}) ; 
//   setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(formData) ;
}

return (
    <div className={styles.container}>
       { showVerification ? (
        <SendVerificationCode formData={formData} />
       ):
       <>
      <div className={styles.header}>
        {/* <MedicalIcon className={styles.logo} /> */}
        <h1>Espace Santé Connectée</h1>
        <p>Créez votre accès sécurisé</p>
      </div>

      <form className={styles.form}>
        {/* Role Selection */}
        <div className={styles.roleSelector}>
           
        </div>

        {/* Form Fields */}
        <div className={styles.formGroup}>
          <label>
            <FiUser className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Nom"
              required
              className={styles.inputField}
              name="nom"
              onChange={handleChange}

              
            />
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            <FiUser className={styles.inputIcon} />
            <input
              type="text"
              placeholder="prenom"
              required
              className={styles.inputField}
              name="prenom"
              onChange={handleChange}

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
                name="email"
                 onChange={handleChange}

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
                name="tel"
                 onChange={handleChange}

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
                        name="password"
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  {/* <div className={styles.formGroup}>
                    <label>
                      <FiLock className={styles.inputIcon} />
                      <input
                        type="password"
                        placeholder="Confirmation"
                        required
                        className={styles.inputField}
                        name="Confirmation"
                        onChange={handleChange}

                      />
                    </label>
                  </div> */}

        </div>

        {/* <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>
              <FiCalendar className={styles.inputIcon} />
              <input
                type="date"
                className={styles.inputField}
                max={new Date().toISOString().split('T')[0]}
                name="birthDate"
                onChange={handleChange}

              />
            </label>
          </div>
        </div> */}

       {SubmitButton ?
          <button type="submit" className={styles.submitButton} onClick={handleSubmit} disabled>
          chargement...
          <FiArrowRight className={styles.buttonIcon} />
        </button>
        :
         <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
          Créer mon compte
          <FiArrowRight className={styles.buttonIcon} />
        </button>
        }

                                                      
        <div className={styles.footer}>
          <p>En continuant, vous acceptez nos 
            <a href="/conditions">Conditions d'utilisation</a> et 
            <a href="/confidentialite">Politique de confidentialité</a>
          </p>
        </div>
      </form>
      </>
}
    </div>
  );
}