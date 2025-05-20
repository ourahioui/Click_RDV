import { useState } from "react";
import { Link } from "react-router-dom"; // Assure-toi d'utiliser react-router-dom
import styles from "./styles.module.css";
import Slider from './Slider' ; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </div>

      <div
        className={`${styles.links} ${
          isMenuOpen ? styles.linksActive : styles.linksHidden
        }`}
        aria-hidden={!isMenuOpen}
      >
        <Link to="/" onClick={closeMenu} className={styles.link}>
          Accueil
        </Link>
        <Link to="/" onClick={closeMenu} className={styles.link}>
          Trouver des médecins
        </Link>
        {/* <Link to="/services" onClick={closeMenu} className={styles.link}>
          Services
        </Link> */}
        {/* <Link to="/projects" onClick={closeMenu} className={styles.link}>
          Projets
        </Link> */}
        <Link to="/" onClick={closeMenu} className={styles.button}>
          Compte Médecin
        </Link>
        <Link to="/Login" onClick={closeMenu} className={styles.button}>
          Se connecter / S'inscrire
        </Link>
      </div>
    </nav>
    <Slider/>
    </>
  );
}
