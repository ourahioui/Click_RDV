// components/SpecialistCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './SpecialistCard.module.css';

const SpecialistCard = ({ specialist }) => {
  return (
    <div className={styles.specialistCard}>
      <div className={styles.imgContainer}>
        <img 
          src={specialist.img} 
          alt={specialist.name}
          className={styles.doctorImage} 
        />
      </div>
      <div className={styles.infoContainer}>
        <h5 className={styles.doctorName}>{specialist.name}</h5>
        <p className={styles.doctorSpecialty}>{specialist.specialty}</p>
        <div className={styles.specialistDot}></div>
      </div>
    </div>
  );
};

export default SpecialistCard;