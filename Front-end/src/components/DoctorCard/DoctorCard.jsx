import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faThumbsUp, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './DoctorCard.module.css';

// Placeholder for TimeSlots component - to be implemented later
const TimeSlots = ({ slots }) => {
  if (!slots || slots.length === 0) return null;
  return (
    <div className={`mt-3 ${styles.timeSlotsContainerPlaceholder}`}> 
      <p className="text-muted small">Time slots would appear here.</p>
      {/* Example: Render first few slots if available */}
      {/* {slots.slice(0, 5).map((slot, index) => (
        <button key={index} className={`btn btn-outline-primary btn-sm me-1 mb-1 ${styles.timeSlotButton}`}>{slot}</button>
      ))} */}
    </div>
  );
};

TimeSlots.propTypes = {
  slots: PropTypes.array,
};

const DoctorCard = ({ doctor }) => {
  const primaryColor = '#2AA7FF';
  const greenColor = '#28a745';

  const imageUrl = doctor.imageUrl || 'https://via.placeholder.com/100';

  return (
  <div className={`card mb-4 ${styles.doctorCard}`}>
    <div className="row g-0">
    {/* Image Column */}
    <div className={`col-md-2 d-flex align-items-center justify-content-center ${styles.imageContainer}`}>
      <img src={imageUrl} className={`img-fluid rounded-circle ${styles.doctorImage}`} alt={`Dr. ${doctor.name}`} />
      <FontAwesomeIcon icon={faCheckCircle} className={styles.verifiedIcon} style={{ color: primaryColor }} />
    </div>

    {/* Details Column */}
    <div className="col-md-7">
      <div className="card-body">
      <h5 className={`card-title ${styles.doctorName}`}>Dr. {doctor.name}</h5>
      <p className={`card-text text-muted ${styles.doctorSpecialty}`}>{doctor.specialty}</p>
      <p className={`card-text text-muted small ${styles.doctorExperience}`}>{doctor.experience} années d'expérience au total</p>
      <p className={`card-text text-muted small ${styles.doctorLocation}`}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> {doctor.location}
      </p>
      {doctor.rating && (
        <div className={`mt-2 ${styles.ratingContainer}`}>
        <span className={styles.ratingBadge} style={{ backgroundColor: greenColor, color: 'white' }}>
          <FontAwesomeIcon icon={faThumbsUp} className="me-1" /> {doctor.rating}%
        </span>
        {doctor.patientStories && <span className={`ms-2 text-muted small ${styles.patientStories}`}>{doctor.patientStories} Patient Stories</span>}
        </div>
      )}
      </div>
    </div>

    {/* Availability & Booking Column */}
    <div className={`col-md-3 d-flex flex-column align-items-md-end align-items-start justify-content-center ${styles.bookingContainer}`}>
      <p className={`mb-1 ${styles.availabilityText}`} style={{ color: greenColor }}>Disponible aujourd'hui</p>
      <a href={doctor.bookingUrl || '#'} className={`btn ${styles.bookingButton}`} style={{ backgroundColor: primaryColor, color: 'white' }}>
      Réservez Une Rendez-Vous
      </a>
    </div>
    </div>

    {/* Time Slots Section (conditionally rendered) */}
    {doctor.timeSlots && doctor.timeSlots.length > 0 && (
    <div className={`card-footer bg-transparent border-top-0 ${styles.timeSlotsFooter}`}>
       <TimeSlots slots={doctor.timeSlots} />
    </div>
    )}
  </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  rating: PropTypes.number,
  patientStories: PropTypes.number,
  imageUrl: PropTypes.string,
  bookingUrl: PropTypes.string,
  timeSlots: PropTypes.array,
  }).isRequired,
};

export default DoctorCard;

