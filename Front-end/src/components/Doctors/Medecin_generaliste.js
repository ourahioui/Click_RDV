import { useLocation } from 'react-router-dom';
import React from 'react';
import styles from './Medecin_generaliste.module.css';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import Timestots from '../TImeSlots/TimeSlots';

export default function Medecin_generaliste() {
  const location = useLocation();
  const doctor = location.state;

  return (
    <div className={styles.doctorContainer}>
      <div className={styles.doctorLayout}>
        
        {/* Colonne gauche : Informations du médecin */}
        <section className={styles.leftColumn}>
          <div className={styles.doctorCard}>
            
            {/* En-tête du médecin */}
            <header className={styles.doctorHeader}>
              <img
                src={`http://localhost:5000/uploads/${doctor.photo}`}
                alt={`Dr ${doctor.nom} ${doctor.prenom}`}
                className={styles.photoImg}
              />
              <h2 className={styles.doctorName}>Dr {doctor.nom} {doctor.prenom}</h2>
              <p className={styles.doctorSpecialty}>{doctor.specialite}</p>
              <p className={styles.doctorLocation}>{doctor.ville}</p>
              <p className={styles.doctorAvailability}>Disponible aujourd'hui</p>
            </header>

            {/* Informations supplémentaires */}
            <div className={styles.doctorInfo}>
              <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <Globe className={styles.sectionIcon} />
                  <span>Langues Parlées</span>
                </div>
                <div className={styles.languagesContainer}>
                  {doctor.languesParlees?.split(',').map((langue, index) => (
                    <span key={index} className={styles.languageTag}>
                      {langue.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.greenDot}></div>
                  <span>Tarif</span>
                </div>
                <div className={styles.tarifContent}>
                  <span>{doctor.tarif} MAD / consultation</span>
                </div>
              </div>

              <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.purpleDot}></div>
                  <span>Contact</span>
                </div>
                <div className={styles.contactContent}>
                  <div><Phone className={styles.icon} /> {doctor.tel}</div>
                  <div><Mail className={styles.icon} /> {doctor.email}</div>
                </div>
              </div>

              <div className={styles.infoSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.orangeDot}></div>
                  <span>Adresse</span>
                </div>
                <div className={styles.accessContent}>
                  <MapPin className={styles.icon} />
                  <span>{doctor.adresse}, {doctor.ville}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colonne droite : calendrier */}
        <section className={styles.rightColumn}>
          <div className={styles.timestotsWrapper}>
            <h3 className={styles.sectionTitle}>Prendre Rendez-vous</h3>
            <Timestots medecinId={doctor.id} />
          </div>
        </section>
      </div>
    </div>
  );
}
