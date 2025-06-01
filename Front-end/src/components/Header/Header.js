import React from 'react';
import styles from './Header.module.css';
import { Container, Navbar, Nav, NavDropdown, Button  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'  ;
import { jwtDecode } from 'jwt-decode';

import { FiUser, FiMail, FiPhone, FiLock, FiCalendar, FiArrowRight } from 'react-icons/fi';
// const   isLoggedIn = localStorage.getItem("") ; 

const Header = () => {
  const [Data,setData] = useState() ;
  const [reloadPage,setreloadPage] = useState() ;
  useEffect(()=>{
    // window.location.reload();
  

    if (localStorage.getItem("reloadAcceuille") === "true") {
      console.log("🔁 Rechargement de la page d'accueil...");
      localStorage.removeItem("reloadAcceuille"); // Supprimer au lieu de mettre à "false"
      window.location.reload();
    }
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setData(decoded);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
    
    // console.log(decoded);
  },[])
  return (
    <header>
      
      
      {/* Navigation principale */}
      <Navbar expand="lg" className={styles.header + " py-2"}>
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.logo}>
            <i className="fas fa-calendar-alt me-2" style={{color: '#2AA7FF'}}></i>
            ClickRDV
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-navbar" />
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className={styles.navLink + " mx-2"}>
                Accueil
              </Nav.Link>
              
              <Nav.Link as={Link} to="/doctors" className={styles.navLink + " mx-2"}>
                Trouver des médecins
              </Nav.Link>
              
              
              <Nav.Link as={Link} to="/faq" className={styles.navLink + " mx-2"}>
                Support
              </Nav.Link>
               
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
             <Nav.Link as={Link} to="/LoginMedecin" className={styles.navLink + " mx-2"}>
                <Button className={styles.loginButton}>
                 vous etes un  médecine ? 
              </Button>
              </Nav.Link>

              <Nav.Link as={Link} to="/LoginPatient" className={styles.navLink + " mx-2"}>
                <Button className={styles.loginButton}>
                  Login/Signup
                </Button>
              </Nav.Link>
              

              {Data &&
              (<Nav.Link 
                  as={Link} 
                  to="/Profile" 
                  className={`mx-2 ${styles.navLink}`}
                  aria-label="Accéder au profil"
                >
              <div className={styles.profileLinkContent}>
                <FiUser className={styles.profileIcon} />
                <span className={styles.profileText}>Profile</span>
              </div>
            </Nav.Link>
              )}
              

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
