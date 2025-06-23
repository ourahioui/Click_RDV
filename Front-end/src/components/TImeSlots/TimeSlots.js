import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AppointmentForm from '../BookingForm/BookingForm';
import { Modal } from 'react-bootstrap';
import styles from './TimeSlots.module.css';
import modalStyles from './modal.module.css';

moment.locale('fr');
export default function TimeSlots({ medecinId }) {
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(moment().startOf('day'));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedDays, setExpandedDays] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchDisponibilites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/disponibilites`, {
        params: { medecinId },
      });
      const normalizedData = {};
      for (const key in res.data) {
        const normalizedKey = moment(key).format('YYYY-MM-DD');
        normalizedData[normalizedKey] = res.data[key].sort((a, b) =>
          a.heureDebut.localeCompare(b.heureDebut)
        );
      }
      setData(normalizedData);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  useEffect(() => {
    if (medecinId) fetchDisponibilites();
  }, [medecinId, startDate]);

  useEffect(() => {
    if (!user) setSelectedSlot(null);
  }, [user]);

  const getDisplayedDates = () =>
    Array.from({ length: 7 }, (_, i) =>
      moment(startDate).add(i, 'days').format('YYYY-MM-DD')
    );

  const handleBookAppointment = (date, heureDebut) => {
    if (!user) {
      navigate('/LoginPatient');
    } else {
      setSelectedSlot({ date, heureDebut });
      setShowModal(true);
    }
  };

  const nextWeek = () => setStartDate(prev => moment(prev).add(7, 'days'));
  const prevWeek = () => {
    const newDate = moment(startDate).subtract(7, 'days');
    if (newDate.isSameOrAfter(moment().startOf('day'))) {
      setStartDate(newDate);
    }
  };

  const toggleDayExpansion = (date) => {
    setExpandedDays((prev) =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  const displayedDates = getDisplayedDates();

  // ✅ Vérifie s'il existe au moins une disponibilité
  const hasDisponibilites = displayedDates.some(date => (data[date] || []).length > 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          onClick={prevWeek}
          className={styles.navButton}
          disabled={startDate.isSameOrBefore(moment().startOf('day'))}
        >
          ←
        </button>
        <div className={styles.headerInfo}>
          <div className={styles.title}>Disponibilités</div>
          <div className={styles.dateRange}>
            {moment(startDate).format('D MMM')} -{" "}
            {moment(startDate).add(6, 'days').format('D MMM')}
          </div>
        </div>
        <button onClick={nextWeek} className={styles.navButton}>→</button>
      </div>

      {!hasDisponibilites ? (
        <div className={styles.noDisponibiliteMessage}>
          Aucune disponibilité trouvée pour cette semaine. Veuillez réessayer plus tard.
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {displayedDates.map((date, i) => (
                  <th key={i} className={styles.tableHeader}>
                    <div className={styles.dayName}>{moment(date).format('dddd')}</div>
                    <div className={styles.dayDate}>{moment(date).format('D MMM')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((rowIndex) => (
                <tr key={rowIndex}>
                  {displayedDates.map((date, colIndex) => {
                    const slots = data[date] || [];
                    const slot = slots[rowIndex];

                    return (
                      <td key={colIndex} className={styles.tableCell}>
                        {slot ? (
                          <button
                            className={styles.timeSlot}
                            onClick={() => handleBookAppointment(date, slot.heureDebut)}
                          >
                            {slot.heureDebut}
                          </button>
                        ) : (
                          <div className={styles.emptySlot}>—</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                {displayedDates.map((date, i) => {
                  const slots = data[date] || [];
                  const isExpanded = expandedDays.includes(date);
                  const extraSlots = isExpanded ? slots.slice(4) : [];

                  return (
                    <td key={i} className={styles.tableCell}>
                      {isExpanded &&
                        extraSlots.map((slot, j) => (
                          <button
                            key={j}
                            className={`${styles.timeSlot} ${styles.extraSlot}`}
                            onClick={() => handleBookAppointment(date, slot.heureDebut)}
                          >
                            {slot.heureDebut}
                          </button>
                        ))}
                      {slots.length > 4 && (
                        <button
                          onClick={() => toggleDayExpansion(date)}
                          className={styles.moreButton}
                        >
                          {isExpanded ? 'Voir moins' : 'Voir plus'}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className={modalStyles.modal}
      >
        <Modal.Header closeButton className={modalStyles.modalHeader}>
          <Modal.Title className={modalStyles.modalTitle}>Réserver un rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.modalBody}>
          {selectedSlot && (
            <AppointmentForm
              date={selectedSlot.date}
              heureDebut={selectedSlot.heureDebut}
              medecinId={medecinId}
              user={user}
              onClose={() => setShowModal(false)}
              onConfirm={() => {
                setShowModal(false);
                fetchDisponibilites();
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}