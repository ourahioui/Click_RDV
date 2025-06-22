import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import styles from './BookingForm.module.css';
import { toast } from 'react-toastify';

export default function BookingForm({ date, heureDebut, medecinId, user, onCancel, onConfirm }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: ''
  });
  const [medecinNom, setMedecinNom] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger nom complet du médecin
  useEffect(() => {
    const fetchData = async () => {
      try {
        const medecinRes = await axios.get(`http://localhost:5000/api/medecins/${medecinId}`);
        setMedecinNom(`Dr. ${medecinRes.data.nom} ${medecinRes.data.prenom}`);
        if (user?.id) {
          const userRes = await axios.get(`http://localhost:5000/patient/${user.id}`);
          setFormData({
            nom: userRes.data.nom || '',
            prenom: userRes.data.prenom || '',
            email: userRes.data.email || '',
            tel: userRes.data.tel || ''
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setMedecinNom("Médecin inconnu");
        setError("Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [medecinId, user]);

  const validateForm = () => {
    if (!formData.nom.trim() || !formData.prenom.trim() || !formData.email.trim() || !formData.tel.trim()) {
      return "Veuillez remplir tous les champs obligatoires.";
    }
    
    if (!medecinId || !user?.id || !date || !heureDebut) {
      return "Informations de rendez-vous manquantes.";
    }
    
    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Veuillez entrer une adresse email valide.";
    }
    
    return null;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError(null);
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/rendez-vous', {
        medecinId,
        patientId: user.id,
        date,
        heure: heureDebut,
      });

      toast.success('Rendez-vous confirmé avec succès !');
      if (onConfirm) onConfirm();
    } catch (error) {
      console.error("Erreur lors de la confirmation du rendez-vous :", error);
      const errorMessage = error.response?.data?.message || "Échec de la confirmation du rendez-vous.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur si l'utilisateur commence à corriger
    if (error) setError(null);
  };

  if (isLoading) {
    return (
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.loader}>Chargement en cours...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h5 className={styles.title}>Confirmation de rendez-vous</h5>
        
        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>📅 Date :</span>
            <span className={styles.infoValue}>{new Date(date).toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>🕐 Heure :</span>
            <span className={styles.infoValue}>{heureDebut}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>👨‍⚕️ Médecin :</span>
            <span className={styles.infoValue}>{medecinNom}</span>
          </div>
        </div>

        <form onSubmit={handleConfirm} className={styles.form}>
          <h6 className={styles.sectionTitle}>Vos informations personnelles</h6>
          
          {error && (
            <div className={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nom *</label>
              <input
                className={styles.input}
                value={formData.nom}
                onChange={e => handleInputChange('nom', e.target.value)}
                placeholder="Votre nom de famille"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Prénom *</label>
              <input
                className={styles.input}
                value={formData.prenom}
                onChange={e => handleInputChange('prenom', e.target.value)}
                placeholder="Votre prénom"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Email *</label>
              <input
                type="email"
                className={styles.input}
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="votre.email@exemple.com"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Téléphone *</label>
              <input
                type="tel"
                className={styles.input}
                value={formData.tel}
                onChange={e => handleInputChange('tel', e.target.value)}
                placeholder="06 12 34 56 78"
                required
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className={`${styles.button} ${styles.primaryButton}`}
            >
              🩺 Confirmer le rendez-vous
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}