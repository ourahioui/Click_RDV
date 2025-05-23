import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './TimeSlots.module.css';

const TimeSlots = ({ availableDays }) => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  if (!availableDays || availableDays.length === 0) {
    return <p>Aucun créneau disponible.</p>;
  }

  const currentDay = availableDays[currentDayIndex];

  const goToPreviousDay = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : availableDays.length - 1));
  };

  const goToNextDay = () => {
    setCurrentDayIndex((prevIndex) => (prevIndex < availableDays.length - 1 ? prevIndex + 1 : 0));
  };

  // Group slots by time of day (assuming slots have a 'period' property)
  const groupedSlots = currentDay.slots.reduce((acc, slot) => {
    const period = slot.period || 'Après-Midi'; // Default period if not specified
    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(slot.time);
    return acc;
  }, {});

  return (
    <div className={`card ${styles.timeSlotsCard}`}>
      <div className={`card-header d-flex justify-content-between align-items-center ${styles.cardHeader}`}>
        <button className={`btn btn-link ${styles.navButton}`} onClick={goToPreviousDay} aria-label="Previous day">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className={styles.dayInfo}>
          <span className={styles.dayLabel}>{currentDay.dayLabel}</span>
          {currentDay.date && <span className={styles.dayDate}> - {currentDay.date}</span>}
          <span className={styles.availabilityCount}>{currentDay.availabilityText}</span>
        </div>
        <button className={`btn btn-link ${styles.navButton}`} onClick={goToNextDay} aria-label="Next day">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`card-body ${styles.cardBody}`}>
        {Object.entries(groupedSlots).map(([period, times]) => (
          <div key={period} className="mb-3">
            <h6 className={styles.periodTitle}>{period}</h6>
            <div className={styles.slotsGrid}>
              {times.map((time, index) => (
                <button key={index} className={`btn btn-outline-primary ${styles.timeSlotButton}`}>
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
        {Object.keys(groupedSlots).length === 0 && (
            <p className='text-muted text-center'>Aucun créneau disponible pour {currentDay.dayLabel}.</p>
        )}
      </div>
    </div>
  );
};

TimeSlots.propTypes = {
  availableDays: PropTypes.arrayOf(
    PropTypes.shape({
      dayLabel: PropTypes.string.isRequired, // e.g., "Aujourd'hui", "Demain"
      date: PropTypes.string, // e.g., "Ven. 21 Février"
      availabilityText: PropTypes.string.isRequired, // e.g., "11 Emplacements Disponibles"
      slots: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired, // e.g., "11:30 AM"
          period: PropTypes.string, // e.g., "Matin", "Après-Midi", "Soir"
        })
      ).isRequired,
    })
  ).isRequired,
};

export default TimeSlots;
