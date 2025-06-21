import React, { useState } from 'react';
import SearchSection from './SearchSection/SearchSection';
import DoctorCard from './DoctorCard/DoctorCard';
import Pagination from './Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './DoctorPage.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function DoctorPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const doctorsPerPage = 4;
  

  const availableDaysData = [
    {
      dayLabel: "Aujourd'hui",
      availabilityText: "11 Emplacements Disponibles",
      slots: [
        { time: "11:30 AM", period: "Matin" },
        { time: "12:00 PM", period: "Après-Midi" },
        { time: "12:30 PM", period: "Après-Midi" },
        { time: "01:30 PM", period: "Après-Midi" },
        { time: "02:00 PM", period: "Après-Midi" },
        { time: "02:30 PM", period: "Après-Midi" },
        { time: "06:00 PM", period: "Soir" },
        { time: "06:30 PM", period: "Soir" },
        { time: "07:00 PM", period: "Soir" },
        { time: "07:30 PM", period: "Soir" },
      ]
    },
    {
      dayLabel: "Demain",
      availabilityText: "17 Emplacements Disponibles",
      slots: [
        { time: "09:00 AM", period: "Matin" },
        { time: "10:00 AM", period: "Matin" },
      ]
    },
    {
      dayLabel: "Ven. 21 Février",
      availabilityText: "18 Emplacements Disponibles",
      slots: []
    }
  ];

  const totalDoctorCount = doctors.length;
  const totalPages = Math.ceil(totalDoctorCount / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const searchData = useSelector((state) => state.search);
         
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const ville = queryParams.get("ville"); // ex: "2"
  const specialite = queryParams.get("specialite");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        if (ville || specialite) {
          const res = await axios.get("http://localhost:5000/api/medecins", {
            params: {
              specialite: specialite,
              ville: ville
            },
          });
          setDoctors(res.data);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDoctors();
  }, [ville, specialite]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (resultats) => {
    setDoctors(resultats);
    setCurrentPage(1);
  };
 
 

  return (
    <div className={styles.appContainer}>
      <SearchSection  />

      <main className={`container ${styles.mainContent}`}>
        <div className={`my-4 ${styles.resultsHeader}`}>
          <h4>{totalDoctorCount} médecins disponibles</h4>
          <p className={styles.resultsSubheader}>
            <FontAwesomeIcon icon={faCheckCircle} className="me-1" style={{ color: '#28a745' }} />
            Prenez rendez-vous avec un temps d'attente minimum et des coordonnées de médecin vérifiées
          </p>
        </div>
     
        {doctors.length === 0 ? (
          <p>Aucun médecin trouvé.</p>
        ) : (
          currentDoctors.map((doctor, index) => (
           
            <React.Fragment key={index} >
              <DoctorCard doctor={doctor}   />
              {index === 0 && <TimeSlots availableDays={availableDaysData} />}
            <React.Fragment key={index}>
              <DoctorCard doctor={doctor} />
              
            </React.Fragment>
          ))
        )}

        {doctors.length > doctorsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default DoctorPage;
