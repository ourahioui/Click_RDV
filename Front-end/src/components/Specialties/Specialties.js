import React from 'react';
import styles from './Specialties.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Specialties = () => {
  // Données des spécialités
  const specialties = [
    { id: 1, name: 'médecin général', icon: 'fa-hospital' },
    { id: 2, name: 'Neurologue', icon: 'fa-stethoscope' },
    { id: 3, name: 'Radiologue', icon: 'fa-heartbeat' },
    { id: 4, name: 'Gynécologue', icon: 'fa-heartbeat' },
    { id: 5, name: 'Cardiologue', icon: 'fa-heart' },
    { id: 6, name: 'Psychiatre', icon: 'fa-shield-alt' },
    { id: 7, name: 'Pédiatre', icon: 'fa-hospital' },
    { id: 8, name: 'Orthopédiste', icon: 'fa-bone' },
  ];

  return (
    <section className={styles.specialties}>
      <Container>
        <h2 className={styles.sectionTitle}>Recherche Par Spécialisation</h2>
        
        <Row>
          {specialties.map(specialty => (
            <Col key={specialty.id} xs={6} md={3} className="mb-4">
              <div className={styles.specialtyCard}>
                <i className={`fas ${specialty.icon} ${styles.specialtyIcon}`}></i>
                <h3 className={styles.specialtyName}>{specialty.name}</h3>
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="text-center">
          <Button className={styles.viewAllButton}>
            Voir Tout
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Specialties;
