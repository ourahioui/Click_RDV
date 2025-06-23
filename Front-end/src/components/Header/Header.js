import React from 'react';
import styles from './Header.module.css';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FiUser,  FiCalendar, FiLogOut } from 'react-icons/fi';
import Image from 'react-bootstrap/Image';

const Header = () => {
  const [Data, setData] = useState();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setData(decoded);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("reloadAcceuille");
    setData(null);
    window.location.href = "/";
  };

  // Vérifie si l'utilisateur est un médecin
  const isMedecin = Data?.role === "medecins";

  return (
    <header>
      {/* Navigation principale */}
      <Navbar expand="lg" className={styles.header + " py-2"}>
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.logo}>
            <Image src="Images/Logo.png" alt="ClickRDV" />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-navbar" />
          
          <Navbar.Collapse id="main-navbar">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className={styles.navLink + " mx-2"}>
                Accueil
              </Nav.Link>
              
              <Nav.Link as={Link} to="/doctors?specialite=Cardiologie&ville=" className={styles.navLink + " mx-2"}>
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
              
              {!Data ? (
                <>
                  <Nav.Link as={Link} to="/LoginMedecin" className={styles.navLink + " mx-2"}>
                    <Button className={styles.loginButton}>
                      Vous êtes un médecin ? 
                    </Button>
                  </Nav.Link>

                  <Nav.Link as={Link} to="/LoginPatient" className={styles.navLink + " mx-2"}>
                    <Button className={styles.loginButton}>
                      Login/Signup
                    </Button>
                  </Nav.Link>
                </>
              ) : !isMedecin ? ( // Ne montre pas le bouton déconnexion si c'est un médecin
                <>
                  

                  {/* Menu déroulant profil seulement pour les patients */}
                  <div 
                    className={styles.profileDropdownContainer}
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    onMouseLeave={() => setShowProfileDropdown(false)}
                  >
                    <div className={`mx-2 ${styles.profileTrigger}`}>
                      <div className={styles.profileLinkContent}>
                        <FiUser className={styles.profileIcon} />
                        <span className={styles.profileText}>
                          {Data.nom || Data.name || 'Profile'}
                        </span>
                        <i className={`fas fa-chevron-down ${styles.chevronIcon}`}></i>
                      </div>
                    </div>

                    {showProfileDropdown && (
                      <div className={styles.profileDropdown}>
                        <Link 
                          to="/Profile" 
                          className={styles.dropdownItem}
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <FiUser className={styles.dropdownIcon} />
                          <span>Mon Profil</span>
                        </Link>
                        
                        <Link 
                          to="/mes-rendez-vous" 
                          className={styles.dropdownItem}
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <FiCalendar className={styles.dropdownIcon} />
                          <span>Mes Rendez-vous</span>
                        </Link>
                        
                        <button 
                          onClick={handleLogout}
                          className={`${styles.dropdownItem} ${styles.logoutItem}`}
                        >
                          <FiLogOut className={styles.dropdownIcon} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;