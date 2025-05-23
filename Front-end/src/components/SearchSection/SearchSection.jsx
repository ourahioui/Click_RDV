import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch, faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchSection.module.css';

const SearchSection = ({ onSearch }) => {
  const primaryColor = '#2AA7FF';

  const handleSearchClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (onSearch) {
      // Gather search parameters here if needed
      onSearch();
    }
    console.log('Search clicked');
  };

  return (
    <div className={styles.searchBackground}>
      <div className="container">
        <div className={styles.searchCard}>
          <form className="row g-3 align-items-center">
            {/* L</div>ocation Input */}
            <div className="col-lg-4 col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${styles.inputGroupText}`}><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
              </div>
            </div>

            {/* Search Input */}
            <div className="col-lg-5 col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${styles.inputGroupText}`}><FontAwesomeIcon icon={faSearch} /></span>
                <input type="text" className={`form-control ${styles.formControl}`} placeholder="Médecin, hôpital" aria-label="Search criteria" />
              </div>
            </div>

            {/* Search Button */}
            <div className="col-lg-3 col-md-12">
              <button
                type="submit"
                className={`btn w-100 ${styles.searchButton}`}
                style={{ backgroundColor: primaryColor, color: 'white' }}
                onClick={handleSearchClick}
              >
                <FontAwesomeIcon icon={faSearch} className="me-2" /> Search
              </button>
            </div>
          </form>

          {/* Filters Row */}
          <div className={`row g-2 mt-3 ${styles.filtersRow}`}>
            {/* Availability Dropdown */}
            <div className="col-auto">
              <div className="dropdown">
                <button className={`btn btn-outline-secondary dropdown-toggle ${styles.filterButton}`} type="button" id="availabilityDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Disponibilité
                </button>
                <ul className="dropdown-menu" aria-labelledby="availabilityDropdown">
                  <li><a className="dropdown-item" href="#">Aujourd'hui</a></li>
                  <li><a className="dropdown-item" href="#">Demain</a></li>
                  <li><a className="dropdown-item" href="#">Cette semaine</a></li>
                </ul>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="col-auto">
              <div className="dropdown">
                <button className={`btn btn-outline-secondary dropd</div>own-toggle ${styles.filterButton}`} type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faFilter} className="me-1" /> Filtre
                </button>
                <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                  <li><a className="dropdown-item" href="#">Option 1</a></li>
                  <li><a className="dropdown-item" href="#">Option 2</a></li>
                </ul>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-auto ms-lg-auto">
              <div className="dropdown">
                <button className={`btn btn-outline-secondary dropdown-toggle ${styles.filterButton}`} type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faSortAmountDown} className="me-1" /> Trier par Pertinence
                </button>
                <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                  <li><a className="dropdown-item" href="#">Pertinence</a></li>
                  <li><a className="dropdown-item" href="#">Distance</a></li>
                  <li><a className="dropdown-item" href="#">Note</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;

