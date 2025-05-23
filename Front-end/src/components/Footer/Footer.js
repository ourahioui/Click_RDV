import React from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <a href="#" className={styles.logo}>
              <i className={`fas fa-calendar-alt ${styles.logoIcon}`}></i>
              ClickRDV
            </a>
            
            <div className={styles.contactInfo}>
              <p><i className="fas fa-map-marker-alt"></i> Maroc, Orientale, Oujda</p>
              <p><i className="fas fa-phone-alt"></i> +212 612345678</p>
              <p><i className="fas fa-envelope"></i> clickrdv@gmail.com</p>
            </div>
            
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.socialIcon}><i className="fab fa-twitter"></i></a>
              <a href="#" className={styles.socialIcon}><i className="fab fa-youtube"></i></a>
              <a href="#" className={styles.socialIcon}><i className="fab fa-instagram"></i></a>
            </div>
          </Col>
          
          <Col lg={4} md={6}>
            <h3 className={styles.sectionTitle}>Spécialisation</h3>
            <ul className={styles.linksList}>
              <li><a href="#"><i className="fas fa-chevron-right"></i> médecin général</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Neurologue</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Radiologue</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Gynécologue</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Cardiologue</a></li>
            </ul>
          </Col>
          
          <Col lg={4} md={6}>
            <h3 className={styles.sectionTitle}>lien rapide</h3>
            <ul className={styles.linksList}>
              <li><a href="#"><i className="fas fa-chevron-right"></i> À propos de nous</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Nos tarifs</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Rendez-vous</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> politique de confidentialité</a></li>
            </ul>
          </Col>
        </Row>
        
        <div className={styles.copyright}>
          <p>Copyright © 2025 Click Rendez-vous ClickRdv.com. Tous droits réservés</p>
          <p>Design by <a href="#">Ibrahim Khantach</a></p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
