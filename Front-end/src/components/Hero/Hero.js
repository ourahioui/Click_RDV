import React from 'react';
import styles from './Hero.module.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Évitez les déplacements ! Prenez rendez-vous en ligne</h2>
            <h1 className={styles.mainTitle}>
              Consultation <span>médicale</span>
            </h1>
            
            {/* Indicateurs de carrousel */}
            <div className={styles.carouselIndicators}>
              <div className={styles.indicator}></div>
              <div className={`${styles.indicator} ${styles.active}`}></div>
              <div className={styles.indicator}></div>
            </div>
            
            
          </Col>
          
          <Col lg={6} className="text-center">
            <img 
              src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg" 
              alt="Médecin professionnel" 
              className={styles.doctorImage}
            />
          </Col>
          {/* Boîte de recherche */}
          <div className={styles.searchBox}>
              <h3 className={styles.searchTitle}>Prenez rendez-vous en ligne facilement</h3>
              <Row>
                <Col md={5} className="mb-3 mb-md-0">
                  <div className="position-relative">
                    <i className={`fas fa-search ${styles.inputIcon}`}></i>
                    <Form.Control 
                      type="text" 
                      placeholder="Spécialité" 
                      className={styles.searchInput}
                    />
                  </div>
                </Col>
                <Col md={5} className="mb-3 mb-md-0">
                  <div className="position-relative">
                    <i className={`fas fa-map-marker-alt ${styles.inputIcon}`}></i>
                    <Form.Control 
                      type="text" 
                      placeholder="Localisation" 
                      className={styles.searchInput}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <Button className={styles.searchButton}>
                    Recherche
                  </Button>
                </Col>
              </Row>
            </div>
        </Row>


        
      </Container>
    </section>
  );
};

export default Hero;
