// components/Header.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand href="#home" className={styles.brand}>
            <img 
              src="https://placehold.co/50x30/2AA7FF/FFFFFF.png?text=LOGO" 
              alt="ClickMD" 
              className={styles.logo} 
            />
            <span className={styles.brandName}>ClickMD</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#home" className={styles.navLink}>Accueil</Nav.Link>
              <Nav.Link href="#doctors" className={styles.navLink}>Trouver des médecins</Nav.Link>
              <Nav.Link href="#support" className={styles.navLink}>Support</Nav.Link>
            </Nav>
            <div className={styles.actions}>
              <div className={styles.languageSelector}>
                <Button variant="outline-secondary" className={styles.langButton}>
                  Français
                </Button>
              </div>
              <Button className={styles.loginButton}>Login/Register</Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;