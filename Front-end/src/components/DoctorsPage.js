import React, { useState } from 'react';
import SearchSection from './SearchSection/SearchSection';
import DoctorCard from './DoctorCard/DoctorCard';
import Pagination from './Pagination/Pagination';
import TimeSlots from './TImeSlots/TimeSlots'; // Import TimeSlots
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './DoctorPage.module.css'; // Import App specific styles if any

function DoctorPage() {
  // --- State Management ---
  const [currentPage, setCurrentPage] = useState(1);

  // --- Placeholder Data ---
  // Doctor Data (Example - replace with actual data fetching/props)
  const doctors = [
    {
      name: 'Shantanu Jambhekar',
      specialty: 'médecin général',
      experience: 16,
      location: 'OUJDA',
      rating: 99,
      patientStories: 93,
      imageUrl: 'https://via.placeholder.com/100/2AA7FF/FFFFFF?text=Doc',
      bookingUrl: '#',
      // Time slots are now handled by the separate TimeSlots component below the card
      // timeSlots: [] // Remove timeslots from here if TimeSlots component is separate
    },
    // Add more doctor objects as needed...
     {
      name: 'Shantanu Jambhekar',
      specialty: 'médecin général',
      experience: 16,
      location: 'OUJDA',
      rating: 99,
      patientStories: 93,
      imageUrl: 'https://via.placeholder.com/100/2AA7FF/FFFFFF?text=Doc',
      bookingUrl: '#',
    },
     {
      name: 'Shantanu Jambhekar',
      specialty: 'médecin général',
      experience: 16,
      location: 'OUJDA',
      rating: null, // Example without rating
      imageUrl: 'https://via.placeholder.com/100/2AA7FF/FFFFFF?text=Doc',
      bookingUrl: '#',
    },
     {
      name: 'Shantanu Jambhekar',
      specialty: 'médecin général',
      experience: 16,
      location: 'OUJDA',
      rating: 99,
      imageUrl: 'https://via.placeholder.com/100/2AA7FF/FFFFFF?text=Doc',
      bookingUrl: '#',
    },
  ];

  // Time Slots Data (Example - could be associated with a specific doctor or search result)
  const availableDaysData = [
    {
      dayLabel: "Aujourd'hui",
      date: "", // Optional date string
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
      date: "",
      availabilityText: "17 Emplacements Disponibles",
      slots: [
         { time: "09:00 AM", period: "Matin" },
         { time: "10:00 AM", period: "Matin" },
         // Add more slots
      ]
    },
    {
      dayLabel: "Ven. 21 Février",
      date: "",
      availabilityText: "18 Emplacements Disponibles",
      slots: [
          // Add slots
      ]
    }
  ];



  // Pagination Data (Example)
  const totalDoctorCount = 55; // Example total count
  const doctorsPerPage = 4; // Number of doctors per page
  const totalPages = Math.ceil(totalDoctorCount / doctorsPerPage);

  // --- Event Handlers ---
  const handlePageChange = (pageNumber) => {
    console.log('Changing to page:', pageNumber);
    setCurrentPage(pageNumber);
    // Add logic to fetch data for the new page here
  };

  const handleSearch = () => {
    console.log('Search initiated...');
    // Add search logic here
  };

  

  // --- Render Logic ---
  // Calculate doctors to display for the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  return (
    <div className={styles.appContainer}> {/* Optional: Add a main container class */}
      <SearchSection onSearch={handleSearch} />

      <main className={`container ${styles.mainContent}`}> {/* Main content area */}
        {/* Results Header */}
        <div className={`my-4 ${styles.resultsHeader}`}> {/* Added margin top/bottom */}
          <h4>{totalDoctorCount} médecins disponibles à Oujda</h4>
          <p className={styles.resultsSubheader}>
            <FontAwesomeIcon icon={faCheckCircle} className="me-1" style={{ color: '#28a745' }} />
            Prenez rendez-vous avec un temps d'attente minimum et des coordonnées de médecin vérifiées
          </p>
        </div>

        {/* Doctor Cards List */}
        {currentDoctors.map((doctor, index) => (
          <React.Fragment key={index}>
            <DoctorCard doctor={doctor} />
            {/* Render TimeSlots only for the first doctor card as per the image */}
            {index === 0 && <TimeSlots availableDays={availableDaysData} />}
          </React.Fragment>
        ))}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

    </div>
  );
}

export default DoctorPage;

