// UserRegistrationForm.jsx
import React, { useState } from 'react';
import styles from './RegisterFormUser.module.css';
// import { ReactComponent as MedicalIcon } from './medical-icon.svg';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom' ;
import { useDispatch , useSelector} from "react-redux"  ; 
// import SendVerificationCode from '../components/SendVerificationCode.js' ; 
import SendVerificationCode from './SendVerificationCode.js' ; 
 

export default function MedecinRegister()
{
    const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    tel: '',
    experience: '',
    specialite: '',
    photo: null, // pour le fichier image
    role:'register-medecin'
    });
    const [SubmitButton , setSubmitButton] = useState(false) ; 
    const navigate = useNavigate() ;
  //  const Dispatch = useDispatch()  ;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    

    const handleImageChange  =   (e) => {
    //  localStorage.setItem('photo',e.target.files[0]) ; 

      setFormData((prevData) => ({

        ...prevData,
        photo: e.target.files[0]
    }));

    console.log(formData.photo) ; 
    };
    
    function validateForm()
    {
            if(!formData.nom || !formData.prenom || !formData.email || !formData.password ||!formData.tel || !formData.experience || !formData.specialite || !formData.photo)
            {
            alert("Veuillez remplir tous les champs.");
            return false ; 
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(formData.email))
            {
            alert("adresse email non valide") ; 
            return false  ; 
            }
            
            const telRegex  = /^[0-9]{10}$/ ; 
            if(!telRegex.test(formData.tel))
            {
            alert("Numéro de téléphone invalide (10 chiffres requis)."); 
            return false ; 
            }
            
            return true ;
            
           
    }
    
     

    const handleSubmit = async (e)=>{
        e.preventDefault() ; 
      //    const formDataToSend = new FormData();
      // formDataToSend.append('nom', formData.nom);
      // formDataToSend.append('prenom', formData.prenom);
      // formDataToSend.append('email', formData.email);
      // formDataToSend.append('password', formData.password);
      // formDataToSend.append('tel', formData.tel);
      // formDataToSend.append('experience', formData.experience);
      // formDataToSend.append('specialite', formData.specialite);
      // formDataToSend.append('photo', formData.photo);
      // formDataToSend.append('role', formData.role);
      

        if(validateForm())
        {
                
                navigate('/SendVerificationCode', { state: formData });
                
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
                    // setMessage("Erreur lors de la connexion au serveur");
                }
                }
        
    };
 

    return (
    <div className={styles.container}>
            
           <>
          <div className={styles.header}>
            {/* <MedicalIcon className={styles.logo} /> */}
            <h1>Espace Santé Connectée</h1>
            <p>Créez votre accès sécurisé</p>
          </div>
    
          <form className={styles.form}>
            
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
     
            </div>
             
             <div className={styles.formGroup}>
            <label>
                {/* <FiPhone className={styles.inputIcon} /> */}
                <input
                type="number"   
                placeholder="Expérience en années"
                className={styles.inputField}
                name="experience"
                min="0"
                onChange={handleChange}
                />
            </label>
            </div>
            <div className={styles.formGroup}>
  <label>
    <select
      name="specialite"
      className={styles.inputField}
      onChange={handleChange}
      required
    >
      <option value="">-- Sélectionnez une spécialité --</option>
      <option value="cardiologie">Cardiologie</option>
      <option value="dermatologie">Dermatologie</option>
      <option value="gynécologie">Gynécologie</option>
      <option value="neurologie">Neurologie</option>
      <option value="pédiatrie">Pédiatrie</option>
      <option value="ophtalmologie">Ophtalmologie</option>
    </select>
  </label>
</div>
<div className={styles.formGroup}>
  <label htmlFor="photo" className={styles.customFileLabel}>
    {formData.photo ? formData.photo.name : "Choisir une photo..."}
  </label>
  <input
    type="file"
    id="photo"
    name="photo"
    accept="image/*"
    className={styles.hiddenFileInput}
    onChange={handleImageChange}
  />
</div>


           
    
           {SubmitButton ?
              <button type="submit" className={styles.submitButton}     onClick={handleSubmit}>
              chargement...
              <FiArrowRight className={styles.buttonIcon} />
            </button>
            :
             <button type="submit" className={styles.submitButton}   onClick={handleSubmit}>
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
    {/* } */}
        </div>
      );
}