import React, { useState } from 'react';
import axios from 'axios';
import styles from './Definirdisponibilites.module.css';

const DefinirDisponibilites = ({ id }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({
    heureDebut: '09:00',
    heureFin: '17:00',
    intervalMinutes: 30
  });
  const [loading, setLoading] = useState(false);
  const [showTimeConfig, setShowTimeConfig] = useState(false);

  // Générer les jours du calendrier
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);
    
    // Ajuster pour commencer au lundi
    startDate.setDate(startDate.getDate() - (startDate.getDay() || 7) + 1);
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) % 7);
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateSelected = (date) => {
    return selectedDates.includes(formatDate(date));
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const toggleDate = (date) => {
    if (isPastDate(date)) return;
    
    const dateStr = formatDate(date);
    setSelectedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  const clearSelectedDates = () => {
    setSelectedDates([]);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const generateCreneauxForDate = (date) => {
    const debut = new Date(`${date}T${timeSlots.heureDebut}`);
    const fin = new Date(`${date}T${timeSlots.heureFin}`);
    const creneaux = [];

    while (debut < fin) {
      const heureStr = debut.toTimeString().slice(0, 5);
      creneaux.push({ date, heureDebut: heureStr });
      debut.setMinutes(debut.getMinutes() + timeSlots.intervalMinutes);
    }

    return creneaux;
  };

  const getTotalCreneaux = () => {
    return selectedDates.reduce((total, date) => {
      return total + generateCreneauxForDate(date).length;
    }, 0);
  };

  const handleSubmit = async () => {
    if (selectedDates.length === 0) {
      alert('Veuillez sélectionner au moins une date');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const allDisponibilites = [];

      selectedDates.forEach(date => {
        const creneaux = generateCreneauxForDate(date);
        creneaux.forEach(creneau => {
          allDisponibilites.push({
            medecinId: id,
            date: creneau.date,
            heureDebut: creneau.heureDebut,
          });
        });
      });

      await axios.post("http://localhost:5000/api/disponibilites", allDisponibilites, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedDates([]);
      alert(`${allDisponibilites.length} créneaux enregistrés avec succès !`);
      
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement des disponibilités.');
    } finally {
      setLoading(false);
    }
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>Définir mes disponibilités</h2>
          <p className={styles.subtitle}>
            Sélectionnez les dates où vous souhaitez être disponible
          </p>
        </div>

        <div className={styles.content}>
          {/* Configuration des horaires */}
          <div className={styles.timeConfig}>
            <div className={styles.timeConfigHeader}>
              <h3>Configuration des horaires</h3>
              <button 
                type="button"
                onClick={() => setShowTimeConfig(!showTimeConfig)}
                className={styles.toggleButton}
              >
                {showTimeConfig ? 'Masquer' : 'Configurer'}
              </button>
            </div>
            
            {showTimeConfig && (
              <div className={styles.timeConfigPanel}>
                <div className={styles.timeInputGroup}>
                  <div className={styles.timeInput}>
                    <label>Début</label>
                    <input
                      type="time"
                      value={timeSlots.heureDebut}
                      onChange={(e) => setTimeSlots(prev => ({...prev, heureDebut: e.target.value}))}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.timeInput}>
                    <label>Fin</label>
                    <input
                      type="time"
                      value={timeSlots.heureFin}
                      onChange={(e) => setTimeSlots(prev => ({...prev, heureFin: e.target.value}))}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.timeInput}>
                    <label>Intervalle</label>
                    <select
                      value={timeSlots.intervalMinutes}
                      onChange={(e) => setTimeSlots(prev => ({...prev, intervalMinutes: Number(e.target.value)}))}
                      className={styles.select}
                    >
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>60 min</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Calendrier */}
          <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
              <button 
                onClick={() => navigateMonth(-1)}
                className={styles.navButton}
              >
                ←
              </button>
              <h3 className={styles.monthYear}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button 
                onClick={() => navigateMonth(1)}
                className={styles.navButton}
              >
                →
              </button>
            </div>

            <div className={styles.weekDays}>
              {weekDays.map(day => (
                <div key={day} className={styles.weekDay}>{day}</div>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {calendarDays.map((date, index) => (
                <button
                  key={index}
                  onClick={() => toggleDate(date)}
                  disabled={isPastDate(date)}
                  className={`
                    ${styles.calendarDay}
                    ${isDateSelected(date) ? styles.selected : ''}
                    ${isPastDate(date) ? styles.disabled : ''}
                    ${!isCurrentMonth(date) ? styles.otherMonth : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Résumé des sélections */}
          {selectedDates.length > 0 && (
            <div className={styles.summary}>
              <div className={styles.summaryHeader}>
                <h3>Résumé</h3>
                <button 
                  onClick={clearSelectedDates}
                  className={styles.clearButton}
                >
                  Tout effacer
                </button>
              </div>
              
              <div className={styles.summaryStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{selectedDates.length}</span>
                  <span className={styles.statLabel}>jour{selectedDates.length > 1 ? 's' : ''} sélectionné{selectedDates.length > 1 ? 's' : ''}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{getTotalCreneaux()}</span>
                  <span className={styles.statLabel}>créneau{getTotalCreneaux() > 1 ? 'x' : ''} au total</span>
                </div>
              </div>

              <div className={styles.selectedDates}>
                {selectedDates.sort().map(date => {
                  const dateObj = new Date(date + 'T00:00:00');
                  const creneauxCount = generateCreneauxForDate(date).length;
                  return (
                    <div key={date} className={styles.selectedDate}>
                      <span className={styles.dateText}>
                        {dateObj.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </span>
                      <span className={styles.creneauxCount}>
                        {creneauxCount} créneaux
                      </span>
                      <button
                        onClick={() => toggleDate(dateObj)}
                        className={styles.removeDate}
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className={styles.actions}>
            <button
              onClick={handleSubmit}
              disabled={loading || selectedDates.length === 0}
              className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Enregistrement...
                </>
              ) : (
                `Enregistrer ${getTotalCreneaux()} créneaux`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefinirDisponibilites;