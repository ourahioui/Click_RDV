import React, { useState } from 'react';
import styles from './Hero.module.css';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../../redux/store';
import { useSelector } from 'react-redux';

const Hero = ({ onSearch }) => {
  const [form, setForm] = useState({ ville: "", specialite: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    try {
      if(form.ville!=="" || form.specialite!=="") {
    
      dispatch(setSearchData(form)); // enregistre dans Redux

      navigate('/doctors');
    }
      else {
        alert("Veuillez remplir au moins un champ de recherche.");
      }

    } catch (err) {
      console.error("Erreur :", err);
    }
  };



  return (
    <section className={styles.hero}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Évitez les déplacements ! Prenez rendez-vous en ligne</h2>
            <h1 className={styles.mainTitle}>
              Consultation <span>médicale</span>
            </h1>

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

          <div className={styles.searchBox}>
            <h3 className={styles.searchTitle}>Prenez rendez-vous en ligne facilement</h3>
            <form onSubmit={handleSearchClick}>
              <Row>
                <Col md={5} className="mb-3 mb-md-0">
                  <div className="position-relative">
                    <i className={`fas fa-search ${styles.inputIcon}`}></i>
                    <Form.Control 
                      type="text" 
                      placeholder="Spécialité" 
                      className={styles.searchInput}
                      name="specialite"
                      onChange={handleChange}
                      value={form.specialite}
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
                      name="ville"
                      onChange={handleChange}
                      value={form.ville}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <Button type="submit" className={styles.searchButton}>
                    Recherche
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
