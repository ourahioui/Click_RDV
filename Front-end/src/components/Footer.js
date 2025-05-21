// components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col md={3} className="mb-4 mb-md-0">
            <div className={styles.brandSection}>
              <div className={styles.brand}>
                <img 
                  src="https://placehold.co/50x30/2AA7FF/FFFFFF.png?text=LOGO" 
                  alt="ClickMD" 
                  className={styles.logo} 
                />
                <span className={styles.brandName}>ClickMD</span>
              </div>
              <p className={styles.address}>Maroc, Orientale Oujda</p>
              <p className={styles.phone}>+212 612345678</p>
              <p className={styles.email}>clickmd@gmail.com</p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className={styles.socialLink}>
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className={styles.footerTitle}>Spécialisation</h5>
            <ul className={styles.footerList}>
              <li><a href="#">médecin général</a></li>
              <li><a href="#">Neurologue</a></li>
              <li><a href="#">Radiologue</a></li>
              <li><a href="#">Gynécologue</a></li>
              <li><a href="#">Cardiologue</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className={styles.footerTitle}>lien rapide</h5>
            <ul className={styles.footerList}>
              <li><a href="#">À propos de nous</a></li>
              <li><a href="#">Nos tarifs</a></li>
              <li><a href="#">Rendez-vous</a></li>
              <li><a href="#">politique de confidentialité</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <div className={styles.newsletter}>
              <img 
                src="https://placehold.co/100x100/FFF/CCC.png" 
                alt="Newsletter" 
                className={styles.newsletterImage} 
              />
            </div>
          </Col>
        </Row>
        <div className={styles.copyright}>
          <p>Copyright © 2025 Click Rendez-vous ClickMDr.com. Tous droits réservés</p>
          <p>Design by Ibrahim Khartach</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;