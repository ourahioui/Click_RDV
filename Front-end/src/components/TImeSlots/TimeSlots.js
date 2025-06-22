import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AppointmentForm from '../BookingForm/BookingForm';
import { Modal } from 'react-bootstrap';
import styles from './TimeSlots.module.css';
import stylesModal from "./modal.module.css";


moment.locale('fr');

export default function Disponibilites({ medecinId }) {
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(moment().startOf('day'));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchDisponibilites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/disponibilites`, {
        params: { medecinId }
      });
      const normalizedData = {};
      for (const key in res.data) {
        const normalizedKey = moment(key).format('YYYY-MM-DD');
        normalizedData[normalizedKey] = res.data[key];
      }
      setData(normalizedData);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  };

  useEffect(() => {
    if (medecinId) fetchDisponibilites();
  },[]);


  useEffect(() => {
    if (!user) {
      setSelectedSlot(null);
    }
  }, [user]);

  const getDisplayedDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(moment(startDate).add(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  };

  const getUniqueHours = () => {
    const all = Object.values(data).flat();
    const heures = all.map(h => h.heureDebut);
    return [...new Set(heures)].sort();
  };

  const nextWeek = () => {
    setStartDate(prev => moment(prev).add(7, 'days'));
  };

  const prevWeek = () => {
    const newDate = moment(startDate).subtract(7, 'days');
    if (newDate.isSameOrAfter(moment().startOf('day'))) {
      setStartDate(newDate);
    }
  };

  const handleBookAppointment = (date, heureDebut) => {
    if (!user) {
      navigate('/LoginPatient');
    } else {
      setSelectedSlot({ date, heureDebut });
      setShowModal(true);
    }
  };

  const displayedDates = getDisplayedDates();
  const uniqueHours = getUniqueHours();

  return (
    <div className="container mt-4">
      <div className={`card ${styles.timeSlotsCard}`}>
        <div className={styles.cardHeader}>
          <button
            onClick={prevWeek}
            className={styles.navButton}
            disabled={startDate.isSameOrBefore(moment().startOf('day'))}
          >
            ←
          </button>
          <div className={styles.dayInfo}>
            <div className={styles.dayLabel}>Disponibilités</div>
            <div className={styles.dayDate}>
              {moment(startDate).format('D MMMM')} - {moment(startDate).add(6, 'days').format('D MMMM')}
            </div>
          </div>
          <button onClick={nextWeek} className={styles.navButton}>→</button>
        </div>

        <div className={styles.cardBody}>

          <div className="table-responsive">
            <table className={`table text-center ${styles.table}`}>
              <thead className="table-light">
                <tr>
                  {displayedDates.map((date, index) => (
                    <th key={index}>
                      <div className="text-capitalize fw-bold">{moment(date).format('dddd')}</div>
                      <div className="text-muted">{moment(date).format('D MMM')}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueHours.map((heure, rowIndex) => (
                  <tr key={rowIndex}>
                    {displayedDates.map((date, colIndex) => {
                      const match = data[date]?.find(d => d.heureDebut === heure);
                      return (
                        <td key={colIndex}>
                          {match ? (
                            <button
                              className="btn btn-success w-100 mb-2"
                              onClick={() => handleBookAppointment(date, match.heureDebut)}
                            >
                              {match.heureDebut}
                            </button>
                          ) : (
                            <div className={styles.noAvailability}>—</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 💡 Modal pour afficher le formulaire */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className={stylesModal.customModalWidth}
      >
        <Modal.Header closeButton>
          <Modal.Title>Réserver un rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
