import React from 'react';
import styles from './Header.module.css';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      {/* Bannière d'information */}
      <div className={styles.infoBanner + " info-banner text-center"}>
        Les médecins de ce prototype en sont un exemple et ne sont pas réels.
      </div>
      
      {/* Navigation principale */}
      <Navbar expand="lg" className={styles.header + " py-2"}>
        <Container>
          <Navbar.Brand href="#" className={styles.logo}>
            <i className="fas fa-calendar-alt me-2" style={{color: '#2AA7FF'}}></i>
            ClickRDV
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-navbar" />
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto">
              <Nav.Link href="#" className={styles.navLink + " mx-2"}>Accueil</Nav.Link>
              <Nav.Link href="#" className={styles.navLink + " mx-2"}>Trouver des médecins</Nav.Link>
              <Nav.Link href="#" className={styles.navLink + " mx-2"}>Support</Nav.Link>
            </Nav>
            
            <div className="d-flex align-items-center">
              <NavDropdown 
                title="Français" 
                id="language-dropdown"
                className={styles.langSelector + " me-3"}
              >
                <NavDropdown.Item href="#">Français</NavDropdown.Item>
                <NavDropdown.Item href="#">English</NavDropdown.Item>
                <NavDropdown.Item href="#">العربية</NavDropdown.Item>
              </NavDropdown>
              
              <Button className={styles.loginButton}>
                Login/Signup
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
