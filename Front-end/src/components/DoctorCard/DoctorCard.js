import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faThumbsUp, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './DoctorCard.module.css';
import { useNavigate } from 'react-router-dom';
import TimeSlots from '../TImeSlots/TimeSlots'; // Import the TimeSlots component
// Placeholder for TimeSlots component - to be implemented later



const DoctorCard = ({ doctor }) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const primaryColor = '#2AA7FF';
  const greenColor = '#28a745';
  const navigate = useNavigate();

  // Gestion de l'image du médecin
  const imageUrl =
    doctor.photo
      ? `http://localhost:5000/uploads/${doctor.photo}`
      : doctor.img_url || doctor.imageUrl || 'https://via.placeholder.com/100';

  // Navigation vers la page du médecin
  const handleClick = () => {
    navigate('/medecin-generaliste', { state: doctor });


  // Handle image URL safely
  const getImageUrl = () => {
    if (doctor.photo) return `http://localhost:5000/uploads/${doctor.photo}`;
    return doctor.img_url || doctor.imageUrl || 'https://via.placeholder.com/100';

  };

  return (
    <div className={`card mb-4 ${styles.doctorCard}`}>
      <div className="row g-0">
        {/* Image Column */}
        <div
          className={`col-md-2 d-flex align-items-center justify-content-center ${styles.imageContainer}`}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <img
            src={imageUrl}
            className={`img-fluid rounded-circle ${styles.doctorImage}`}
            alt={`Dr. ${doctor.nom || doctor.name}`}
        <div 
          className={`col-md-2 d-flex align-items-center justify-content-center ${styles.imageContainer}`} 
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={getImageUrl()} 
            className={`img-fluid rounded-circle ${styles.doctorImage}`} 
            alt={`Dr. ${doctor.nom} ${doctor.prenom}`} 
          />
          <FontAwesomeIcon icon={faCheckCircle} className={styles.verifiedIcon} style={{ color: primaryColor }} />
        </div>

        {/* Details Column */}
        <div className="col-md-7" onClick={handleClick} style={{ cursor: 'pointer' }}>
          <div className="card-body">
            <h5 className={`card-title ${styles.doctorName}`}>
              Dr. {doctor.nom || doctor.name} {doctor.prenom}
            </h5>
            <p className={`card-text text-muted ${styles.doctorSpecialty}`}>
              {doctor.specialite || doctor.specialty}
            </p>
        <div 
          className="col-md-7" 
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-body">
            <h5 className={`card-title ${styles.doctorName}`}>Dr. {doctor.nom} {doctor.prenom}</h5>
            <p className={`card-text text-muted ${styles.doctorSpecialty}`}>{doctor.specialite}</p>
            <p className={`card-text text-muted small ${styles.doctorExperience}`}>
              {doctor.experience} années d'expérience au total
            </p>
            <p className={`card-text text-muted small ${styles.doctorLocation}`}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> {doctor.ville}
            </p>
            {doctor.rating && (
              <div className={`mt-2 ${styles.ratingContainer}`}>
                <span 
                  className={styles.ratingBadge} 
                  style={{ backgroundColor: greenColor, color: 'white' }}
                >
                  <FontAwesomeIcon icon={faThumbsUp} className="me-1" /> {doctor.rating}%
                </span>
                {doctor.patientStories && (
                  <span className={`ms-2 text-muted small ${styles.patientStories}`}>
                    {doctor.patientStories} Patient Stories
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Availability & Booking Column */}
        <div className={`col-md-3 d-flex flex-column align-items-md-end align-items-start justify-content-center ${styles.bookingContainer}`}>
          <p className={`mb-1 ${styles.availabilityText}`} style={{ color: greenColor }}>
            Disponible aujourd'hui
          </p>
          <button
            className={`btn ${styles.bookingButton}`}
            style={{ backgroundColor: primaryColor, color: 'white' }}
            onClick={(e) => {
              e.stopPropagation();
              setShowTimeSlots(!showTimeSlots);
            }}
          >
            Réservez Une Rendez-Vous
          </button>
        </div>
      </div>
      
      {showTimeSlots && (
        <div className={`card-footer bg-transparent border-top-0 ${styles.timeSlotsFooter}`}>
          <TimeSlots medecinId={doctor.id} />
        </div>
      )}
    </div>
  );
};

export default DoctorCard;