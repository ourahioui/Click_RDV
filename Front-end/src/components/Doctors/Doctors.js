import React from 'react';
import styles from './Doctors.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Doctors = () => {
  // Données des médecins
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Ahmad Khan', 
      specialty: 'Neurologue',
      image: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg'
    },
    { 
      id: 2, 
      name: 'Dr. Heena Sachdeva', 
      specialty: 'Orthopédiste',
      image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg'
    },
    { 
      id: 3, 
      name: 'Dr. Ankur Sharma', 
      specialty: 'médecin général',
      image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg'
    },
    { 
      id: 4, 
      name: 'Dr. Emily Hull', 
      specialty: 'Cardiologue',
      image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg'
    }
  ];

  return (
    <section className={styles.doctors}>
      <Container>
        <h2 className={styles.sectionTitle}>Notre spécialiste médical</h2>
        
        <Row>
          {doctors.map(doctor => (
            <Col key={doctor.id} md={6} lg={3} className="mb-4">
              <div className={styles.doctorCard}>
                <div className={styles.doctorImage}>
                  <img src={doctor.image} alt={doctor.name} />
                </div>
                <h3 className={styles.doctorName}>{doctor.name}</h3>
                <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
              </div>
            </Col>
          ))}
        </Row>
        
        {/* Indicateurs de carrousel */}
        <div className={styles.carouselIndicators}>
          <div className={styles.indicator}></div>
          <div className={`${styles.indicator} ${styles.active}`}></div>
          <div className={styles.indicator}></div>
        </div>
        
        <div className="text-center">
          <Button className={styles.responseButton}>
            Obtenez votre réponse
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Doctors;
