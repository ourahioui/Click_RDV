 
import React, { useState,useEffect,useRef } from 'react';
import styles from '../PatientRegisterForm/RegisterFormUser.module.css';
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom' ;
 
 
// ------------------------------------------------------------

export default function MedecinRegister({isEdit,header,id})
{
    const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    tel: '',
    experience: '',
    specialiteId: '',
    villeId :'' , 
    photo: null,  
    languesParlees:'' ,
    adresse:'' , 
    role:'register-medecin'
    });
    const [SubmitButton , setSubmitButton] = useState(false) ; 
 
    const [Specialites,setSpecialites] = useState([])  ; 
    const [Villes,setVilles] = useState([])  ;
    const navigate = useNavigate() ;
    const fileInputRef = useRef(null);
  
 
  
//  ---------------------------------------------------------------------
    useEffect(()=>{
      const fetchData = async ()=>{
         let response = await fetch('http://localhost:5000/api/medecins/'+id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      
    });
    
    if (response.ok) {
      const data = await response.json();  
      setFormData(data);
    } else {
      console.error("Erreur lors de la récupération des données");
    }
    const specialites = await fetch("http://localhost:5000/api/specialites") ; 
    if(specialites.ok)
    {
      const data = await specialites.json() ;
      setSpecialites(data)  ;
    }
    const villes = await fetch("http://localhost:5000/api/villes") ; 
    if(villes.ok)
    {
      const data = await villes.json() ;
      setVilles(data)  ;
    }

    
    
   
    }
    fetchData() ;
    
 },[])

// ------------------------------------
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
//----------------------------------------
    
    const handleChange = (e) => {
        const { name, value } = e.target;
       
        setFormData({...formData,[name]:value}) ;
         console.log(formData) ;
    };
    
//------------------------------------------
    const handleImageChange  =   (e) => {
 
      setFormData((prevData) => ({

        ...prevData,
        photo: e.target.files[0]
    }));

    console.log(formData.photo) ; 
    };

 
// ----------------------------------------
const handleLanguesChange = (e) => {
  const { value, checked } = e.target;
  let langues = formData.languesParlees
    ? formData.languesParlees.split(',')
    : [];
    
 
  if (checked) {
    // Ajouter la langue si elle n’est pas déjà là
    if (!langues.includes(value)) {
   
       langues.push(value);
    }
  } else {
    // Supprimer la langue si décochée
    
    langues = langues.filter(langue => langue !== value);
  }
   
  setFormData({...formData,
    languesParlees: langues.join(',')
  });
  console.log(formData) ;
};

// -----------------------------------------
    function validateForm()
    {
           console.log(formData) ;
            if(!formData.nom || !formData.prenom || !formData.email || (!isEdit && !formData.password) ||!formData.tel || !formData.experience || !formData.specialiteId || formData.photo===null)
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
             
             
            if(!formData.password.startsWith('$2b$') && (formData.password.length<8 || formData.password.length>20))
            {
                alert("Le mot de passe doit contenir entre 8 et 20 caractères.");
                return false ; 
                
            }
            
            return true ;
            
           
    }
    
 // --------------------------------------------------------------
    const handleSubmit = async (e)=>{
        e.preventDefault() ; 
      

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
//  --------------------------------------------
const handleMettreAjour = async (e)=>{
     e.preventDefault() ; 
     if(validateForm())
     {
         const formDataToSend = new FormData();
        formDataToSend.append('id', id);
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('prenom', formData.prenom);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('tel', formData.tel);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('specialiteId', formData.specialiteId);
        formDataToSend.append('villeId',formData.villeId) ; 
        formDataToSend.append('photo', formData.photo);  
        formDataToSend.append('adresse',formData.adresse) ; 
        formDataToSend.append('tarif',formData.tarif) ; 
        formDataToSend.append('modesPaiement',formData.modesPaiement)  ;
        formDataToSend.append('languesParlees',formData.languesParlees)  ;
 
        const res = await fetch('http://localhost:5000/api/medecins/UpdateProfile' , {  
              method: 'POST',
               
               body : formDataToSend ,
                
            });
            if (!res.ok) {
              const data = await res.json();
              console.error("Erreur :", data);
              alert("err de mette a jour") ;
            
            } else {
              const data = await res.json();
                alert("mettre a jour avec success") ; 
                window.location.reload();
                
            }
        
     }
}
// -------------------------------------------------------------------
    return (
    <div className={styles.container}>
            
           <>
        
          <div className={styles.header}>
             <h1>Espace Santé Connectée</h1>
            <p>{header?header:'Créez votre accès sécurisé'}</p>
          </div>
           {isEdit ? (
  <>
    <img
      src={`http://localhost:5000/uploads/${formData.photo}`} 
      alt="Image importée avec succès"
      onClick={handleImageClick}
      style={{
        width: '200px',
        height: '200px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        margin: '20px',
        border: '2px solid #ddd',
        cursor: 'pointer',
      }}
    />

    <input
      type="file"
      accept="image/*"
      name="photo"
      ref={fileInputRef}
       style={{ display: 'none' }}
       onChange={handleImageChange}
    />
  </>
) : (
  <div></div>
)}

          

          <form className={styles.form}>
            
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
                  value={formData.nom}
                  
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
                  value={formData.prenom}
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
                     value={formData.email}
                  />
                </label>
              </div>
              </div>
              
               <div className={styles.formRow}>
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
                    value={formData.tel}
                  />
                </label>
              </div>
            </div>
           {isEdit?(
            <>
                <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>
                         
                          <input
                            type="text"
                            placeholder="Adresse"
                            required
                            className={styles.inputField}
                            value={formData.adresse}
                            name="adresse"
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
                            placeholder="Nouveau Mot de passe"
                            required
                            className={styles.inputField}
                            minLength="8"
                            name="password"
                            onChange={handleChange}
                            
                          />
                        </label>
                      </div>
            </div>
               
              <div>
                          <p>Languages parles</p>
                          <label>
                          <input type="checkbox" name="languesParlees" value="Français"   checked={(formData.languesParlees || "").split(",").includes("Français")} onChange={handleLanguesChange}/>
                          Français
                        </label>
                        <label>
                          <input type="checkbox" name="languesParlees" value="Anglais" checked={(formData.languesParlees || "").split(",").includes("Anglais")} onChange={handleLanguesChange} />
                          Anglais
                        </label>
                        <label>
                          <input type="checkbox" name="languesParlees" value="Arabe"   checked={(formData.languesParlees || "").split(",").includes("Arabe")} onChange={handleLanguesChange}/>
                          Arabe
                        </label>
              </div>
           

           <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>
                           
                          <input
                           
                            type="number"
                            placeholder="Tarif"
                            required
                            className={styles.inputField}    
                            name="tarif"
                            onChange={handleChange}
                            value={formData.tarif}
                           />
                          
                        </label>
                      </div>
                       <p>Tarif en dh</p>
            </div>
         
            </>
             
            

            ):
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
                            value={formData.password}
                          />
                        </label>
                      </div>
            
            </div>
            }
            
             
             <div className={styles.formGroup}>
            <label>
               
                Expérience en années
                <input
                type="number"   
                placeholder="Expérience en années"
                className={styles.inputField}
                name="experience"
                min="0"
                onChange={handleChange}
                value={formData.experience}
                />
                
            </label>
            </div>
            <div className={styles.formGroup}>
                          <label htmlFor="specialiteId" className={styles.label}>
                            spécialité
                          </label>
     <select
      name="specialiteId"
      className={styles.inputField}
      onChange={handleChange}
      required
      value={formData.specialiteId}
    >
 
       <option value=""> Sélectionnez une spécialité</option>
      {
        Specialites.map((e)=>(
             <option value={e.id}>{e.specialite}</option>
        ))
      }
     
    </select>
 
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="villeId" className={styles.label}>
        Ville
      </label>
 
     <select
      name="villeId"
      className={styles.inputField}
      onChange={handleChange}
      required 
      value={formData.villeId}
    >
       <option value=""> Sélectionnez une ville</option>
      {
        Villes.map((e)=>(
             <option value={e.id}>{e.ville}</option>
        ))
      }
    </select>
    </div>
  
{!isEdit?(<div className={styles.formGroup}>
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
      </div>):<div></div>}
      

           
    
           {SubmitButton ?
              <button type="submit" className={styles.submitButton}     onClick={handleSubmit}>
              chargement...
              <FiArrowRight className={styles.buttonIcon} />
            </button>
            :
            (isEdit?
              <button type="submit" className={styles.submitButton}    onClick={handleMettreAjour}>
              {isEdit}
              <FiArrowRight className={styles.buttonIcon} />
            </button> :
             <button type="submit" className={styles.submitButton}   onClick={handleSubmit}>
              Créer mon compte
              <FiArrowRight className={styles.buttonIcon} />
            </button>
            )
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

