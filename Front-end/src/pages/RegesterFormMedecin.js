// RegisterForm.jsx
import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import medicalIcon from './medical-icon.svg';

export default function RegisterForm() {
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    birthDate: '',
    licenseNumber: '',
    specialty: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={medicalIcon} alt="Medical Care" className={styles.logo} />
        <h1>Inscription Médicale</h1>
        <p className={styles.subtitle}>Choisissez votre profil</p>
      </div>

      <div className={styles.roleSelector}>
        <button
          className={`${styles.roleButton} ${userType === 'patient' && styles.active}`}
          onClick={() => setUserType('patient')}
        >
          Patient
        </button>
        <button
          className={`${styles.roleButton} ${userType === 'doctor' && styles.active}`}
          onClick={() => setUserType('doctor')}
        >
          Médecin
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nom complet</label>
          <input
            type="text"
            placeholder="Jean Dupont"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email {userType === 'doctor' && 'professionnel'}</label>
          <input
            type="email"
            placeholder={userType === 'doctor' ? "contact@clinique.com" : "jean.dupont@example.com"}
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
        </div>

        {userType === 'patient' && (
          <div className={styles.formGroup}>
            <label>Date de naissance</label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>
        )}

        {userType === 'doctor' && (
          <>
            <div className={styles.formGroup}>
              <label>Numéro de licence médicale</label>
              <input
                type="text"
                placeholder="123456789"
                required
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Spécialité médicale</label>
              <select
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                required
              >
                <option value="">Sélectionnez une spécialité</option>
                <option value="cardiology">Cardiologie</option>
                <option value="dermatology">Dermatologie</option>
                <option value="pediatrics">Pédiatrie</option>
              </select>
            </div>
          </>
        )}

        <div className={styles.formGroup}>
          <label>Adresse {userType === 'doctor' && 'du cabinet'}</label>
          <input
            type="text"
            placeholder="123 Rue de la Santé, Paris"
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          S'inscrire en tant que {userType === 'doctor' ? 'médecin' : 'patient'}
        </button>

        <p className={styles.loginLink}>
          Déjà un compte ? <a href="/login">Connectez-vous</a>
        </p>
      </form>
    </div>
  );
}