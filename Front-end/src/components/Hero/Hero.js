import React, { useState , useEffect} from 'react';
import styles from './Hero.module.css';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import axios from "axios";

const Hero = ({ onSearch }) => {
  const [form, setForm] = useState({ ville: "", specialite: "" });
  const [villes, setVilles] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const navigate = useNavigate();
  // const dispatch = useDispatch() ; 
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    try {
      if (form.ville !== "" || form.specialite !== "") {
        // dispatch(setSearchData(form)); // enregistre dans Redux (décommentez si Redux est utilisé)
        navigate('/doctors?specialite=' + form.specialite + '&ville=' + form.ville);
      } else {
        alert("Veuillez remplir au moins un champ de recherche.");
      }
      if(form.ville!=="" || form.specialite!=="") {
    
      // dispatch(setSearchData(form)); // enregistre dans Redux
      //  navigate('/doctors?specialite=' + form.specialite + '&ville=' + form.ville);
       navigate('/doctors?specialite=' + form.specialite + '&ville=' + form.ville);
      }

       
    
      else {
        
        alert("Veuillez remplir au moins un champ de recherche.");
      }
    
    } catch (err) {
      console.error("Erreur :", err);
    }
  };
  

  

  useEffect(() => {
    // Remplacez les URLs par vos vraies API
    const fetchVilles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/villes');
        setVilles(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des villes:', err);
      }
    };

    const fetchSpecialites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/specialites');
        setSpecialites(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des spécialités:', err);
      }
    };

    fetchVilles();
    fetchSpecialites();
  }, []);



  return (
    <section className={styles.hero}>
      <Container>
        <Row >
          <Col lg={6} className={styles.heroContent}>
            <h2 className={styles.heroTitle}>Évitez les déplacements ! Prenez rendez-vous en ligne</h2>
            <h1 className={styles.mainTitle}>
              Consultation <span>médicale</span>
            </h1>

          </Col>

          <Col lg={6} className="text-center">
            <img 
              src="/Images/Hero_doctor.png" 
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
                    <Form.Select
                      className={styles.searchInput}
                      name="specialite"
                      onChange={handleChange}
                      value={form.specialite}
                    >
                      <option value="">Spécialité</option>
                      {specialites.map((spec, idx) => (
                        <option key={idx} value={spec.specialite}>
                          {spec.specialite}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Col>
                <Col md={5} className="mb-3 mb-md-0">
                  <div className="position-relative">
                    <i className={`fas fa-map-marker-alt ${styles.inputIcon}`}></i>
                    <Form.Select
                      className={styles.searchInput}
                      name="ville"
                      onChange={handleChange}
                      value={form.ville}
                    >
                      <option value="">Ville</option>
                      {villes.map((ville, idx) => (
                        <option key={idx} value={ville.ville}>
                          {ville.ville}
                        </option>
                      ))}
                    </Form.Select>
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
