import React, { useState } from 'react';
import styles from './Faq.module.css';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const Faq = () => {
  const [activeKey, setActiveKey] = useState(null);

  // Données des questions fréquentes
  const faqItems = [
    {
      id: '0',
      question: 'Pourquoi choisir notre médecine pour votre famille ?',
      answer: 'Notre équipe médicale est composée de professionnels hautement qualifiés et expérimentés, dédiés à offrir des soins personnalisés et de qualité. Nous mettons l\'accent sur une approche préventive et holistique, en tenant compte des besoins spécifiques de chaque membre de votre famille.'
    },
    {
      id: '1',
      question: 'Pourquoi sommes-nous différents des autres ?',
      answer: 'Nous nous distinguons par notre approche centrée sur le patient, notre disponibilité, et notre utilisation des technologies modernes pour faciliter l\'accès aux soins. Notre plateforme de rendez-vous en ligne vous permet d\'économiser du temps et d\'éviter les déplacements inutiles.'
    },
    {
      id: '2',
      question: 'Soins et amour pour les personnes âgées de confiance et expérimentés',
      answer: 'Nous accordons une attention particulière aux besoins des personnes âgées, avec des médecins spécialisés en gériatrie qui comprennent les défis spécifiques liés au vieillissement. Nos services sont conçus pour offrir confort, dignité et soins de qualité à nos patients seniors.'
    },
    {
      id: '3',
      question: 'Comment obtenir un rendez-vous en cas d\'urgence ?',
      answer: 'Pour les situations d\'urgence, notre plateforme propose des créneaux prioritaires. Vous pouvez également contacter directement notre service d\'assistance qui vous guidera vers le médecin disponible le plus rapidement possible, selon la nature de votre urgence.'
    }
  ];

  return (
    <section className={styles.faq}>
      <Container>
        <h2 className={styles.sectionTitle}>Questions fréquemment posées</h2>
        
        <Row className="align-items-center">
          <Col lg={5} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg" 
              alt="Médecin professionnel" 
              className={styles.faqImage}
            />
            
            <div className={styles.statsBox}>
              <span className={styles.statsEmoji}>😊</span>
              <div>
                <span className={styles.statsNumber}>84k+</span>
                <p className={styles.statsText}>Des patients satisfaits</p>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
              {faqItems.map((item) => (
                <Accordion.Item key={item.id} eventKey={item.id} className={styles.accordionItem}>
                  <Accordion.Header className={styles.accordionHeader}>
                    {item.question}
                    <i className={`fas ${activeKey === item.id ? 'fa-minus' : 'fa-plus'} ${styles.accordionIcon}`}></i>
                  </Accordion.Header>
                  <Accordion.Body className={styles.accordionBody}>
                    {item.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Faq;
