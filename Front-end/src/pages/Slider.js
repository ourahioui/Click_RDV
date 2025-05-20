import React from "react";
import styles from "./stylesSlider.module.css";
import backgroundImage from "./usman-yousaf-pTrhfmj2jDA-unsplash.jpg"; // Assure-toi que l’image existe
 

export default function Slider() {
  return (
    <section
      className={styles.sliderSection}
      style={{
        backgroundImage: `url(${backgroundImage})`, // Correction ici
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
        
      <div className={styles.overlay}>
        <div className={styles.content}>
            
          <h2 className={styles.title}>Explorez l'Architecture Innovante</h2>
          <p className={styles.text}>
            Découvrez notre passion pour l'architecture moderne à travers des designs audacieux
            qui redéfinissent l'espace et la fonctionnalité. Laissez-nous transformer vos rêves
            en structures emblématiques.
          </p>
          <a 
            href="/#commencez" 
            className={styles.button}
            role="button" // Amélioration accessibilité
          >
            Commencez votre projet
          </a>
        </div>
      </div>
      
    </section>
    
  );
}