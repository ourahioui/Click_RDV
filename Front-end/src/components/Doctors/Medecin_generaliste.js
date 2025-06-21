import { useLocation } from 'react-router-dom';
import './Medecin_generaliste.css';
import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

export default function Medecin_generaliste()
{
    const location = useLocation() ;
    const doctor = location.state ; 
    console.log(doctor) ;

    return (
    <div className="doctor-container" >
      <div className="doctor-card" >

        
        {/* En-tête avec photo, nom et spécialité */}
        <div className="doctor-header" >
          <div className="header-animation"></div>
          
          <div className="header-content">
            <div className="doctor-photo">
              <img 
                src={`http://localhost:5000/uploads/${doctor.photo}`} 
                alt={`Photo de ${doctor.nom}`}
                className="photo-img"
              />
            </div>
            
            <h2 className="doctor-name">
              Dr {doctor.nom} {doctor.prenom}
            </h2>
            
            <div className="doctor-specialty">
              {doctor.specialite}
            </div>
          </div>
        </div>

        {/* Informations détaillées */}
        <div className="doctor-info">
          
          {/* Langues Parlées */}
          <div className="info-section languages-section">
            <div className="section-header">
              <Globe className="section-icon" />
              <span className="section-title">
                Langues Parlées
              </span>
            </div>
            <div className="languages-container">
            {doctor.languesParlees.split(',').map((langue, index) => (
  <span 
    key={index}
    className="language-tag"
  >
    {langue.trim()}
  </span>
))}

            </div>
          </div>

          {/* Tarif */}
          <div className="info-section tarif-section">
            <div className="section-header">
              <div className="section-dot green-dot"></div>
              <span className="section-title">
                Tarif
              </span>
            </div>
            <div className="tarif-content">
              <span className="tarif-amount">{doctor.tarif}</span>
              {/* <span className="tarif-currency">{doctorData.devise} / Consultation</span> */}
            </div>
          </div>

          {/* Contact */}
          <div className="info-section contact-section">
            <div className="section-header">
              <div className="section-dot purple-dot"></div>
              <span className="section-title">
                Contact
              </span>
            </div>
            <div className="contact-content">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span className="contact-text">{doctor.Telephone}</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span className="contact-text">{doctor.email}</span>
              </div>
            </div>
          </div>

          {/* Accès */}
          <div className="info-section access-section">
            <div className="section-header">
              <div className="section-dot orange-dot"></div>
              <span className="section-title">
                Accès
              </span>
            </div>
            <div className="access-content">
              <MapPin className="access-icon" />
              <span className="access-text">
                {doctor.adresse}, {doctor.ville}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

 