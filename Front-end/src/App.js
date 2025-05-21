// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, InputGroup, Card } from 'react-bootstrap';
import styles from './App.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SpecialistCard from './components/SpecialistCard';
import FAQ from './components/FAQ';

function App() {
  const specialists = [
    { id: 1, name: 'Dr. Ahmad Khan', specialty: 'Neurologue', img: 'https://placehold.co/200x200' },
    { id: 2, name: 'Dr. Heena Sachdeva', specialty: 'Orthopédiste', img: 'https://placehold.co/200x200' },
    { id: 3, name: 'Dr. Ankur Sharma', specialty: 'médecin général', img: 'https://placehold.co/200x200' },
    // Add more specialists as needed
  ];

  const specializations = [
    { id: 1, name: 'Médecin général', icon: 'fa-hospital-user' },
    { id: 2, name: 'Neurologue', icon: 'fa-stethoscope' },
    { id: 3, name: 'Radiologue', icon: 'fa-heartbeat' },
    { id: 4, name: 'Gynécologue', icon: 'fa-heartbeat' },
    { id: 5, name: 'Cardiologue', icon: 'fa-heart' },
    { id: 6, name: 'Psychiatre', icon: 'fa-shield-alt' },
    { id: 7, name: 'Pédiatre', icon: 'fa-hospital' },
    { id: 8, name: 'Orthopédiste', icon: 'fa-bone' },
  ];

  const faqItems = [
    { id: 1, question: 'Pourquoi choisir notre médecine pour votre famille ?', answer: 'Nos médecins sont qualifiés et offrent des soins de qualité pour toute la famille.' },
    { id: 2, question: 'Pourquoi sommes-nous différents des autres ?', answer: 'Nous proposons des consultations en ligne faciles et rapides avec des spécialistes de qualité.' },
    { id: 3, question: 'Soins et amour pour les personnes âgées de confiance et expérimentés', answer: 'Nous offrons des soins spécialisés pour les personnes âgées avec des médecins expérimentés.' },
    { id: 4, question: "Comment obtenir un rendez-vous en cas d'urgence ?", answer: 'Vous pouvez utiliser notre option de consultation urgente disponible 24/7.' }
  ];

  return (
    <div className={styles.app}>
      <div className={styles.topBanner}>
        Les médecins de ce prototype en sont un exemple et ne sont pas réels.
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className={styles.heroContent}>
                <p className={styles.subtitle}>Évitez les déplacements ! Prenez rendez-vous en ligne</p>
                <h1 className={styles.mainTitle}>Consultation <span className={styles.highlight}>médicale</span></h1>
              </div>
            </Col>
            <Col md={6}>
              <img 
                src="https://placehold.co/500x400" 
                alt="Doctor" 
                className={`${styles.heroImage} img-fluid`} 
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Section */}
      <section className={styles.searchSection}>
        <Container>
          <h3 className="text-center mb-4">Prenez rendez-vous en ligne facilement</h3>
          <Row className="justify-content-center">
            <Col md={10}>
              <Form className={styles.searchForm}>
                <Row>
                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text className={styles.iconContainer}>
                        <i className="fas fa-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="spécialité"
                        className={styles.formInput}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text className={styles.iconContainer}>
                        <i className="fas fa-map-marker-alt"></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="localisation"
                        className={styles.formInput}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <Button className={styles.searchButton}>
                      Recherche
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Specializations Section */}
      <section className={styles.specializationsSection}>
        <Container>
          <h2 className={`${styles.sectionTitle} text-center mb-5`}>Recherche Par Spécialisation</h2>
          <Row>
            {specializations.map((spec) => (
              <Col key={spec.id} xs={6} md={3} className="mb-4">
                <Card className={styles.specializationCard}>
                  <Card.Body className="text-center">
                    <div className={styles.iconCircle}>
                      <i className={`fas ${spec.icon} ${styles.specIcon}`}></i>
                    </div>
                    <Card.Title className={styles.specTitle}>{spec.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button className={styles.viewMoreButton}>Voir Tout</Button>
          </div>
        </Container>
      </section>

      {/* Specialists Section */}
      <section className={styles.specialistsSection}>
        <Container>
          <h2 className={`${styles.sectionTitle} text-center mb-5`}>Notre spécialiste médical</h2>
          <Row>
            {specialists.map((specialist) => (
              <Col key={specialist.id} md={4} className="mb-4">
                <SpecialistCard specialist={specialist} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats and FAQ Section */}
      <section className={styles.faqSection}>
        <Container>
          <h2 className={`${styles.sectionTitle} text-center mb-4`}>Obtenez votre réponse</h2>
          <h3 className={`${styles.sectionSubtitle} text-center mb-5`}>Questions fréquemment posées</h3>
          
          <Row>
            <Col md={5}>
              <div className={styles.statsCard}>
                <img 
                  src="https://placehold.co/400x300" 
                  alt="Doctor with patient" 
                  className="img-fluid" 
                />
                <div className={styles.statsOverlay}>
                  <h3 className={styles.statsNumber}>84k+</h3>
                  <p className={styles.statsText}>Des patients satisfaits</p>
                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className={styles.faqList}>
                {faqItems.map((item) => (
                  <FAQ key={item.id} question={item.question} answer={item.answer} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default App;
