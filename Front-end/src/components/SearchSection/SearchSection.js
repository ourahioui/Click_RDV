import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch, faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchSection.module.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported for dropdowns and other components
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchSection = ({ onSearch }) => {
  const primaryColor = '#2AA7FF';
  const [form, setForm] = useState({specialite: "", ville: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSearchClick = async (e) => {
  e.preventDefault();
  try {
 
    dispatch(setSearchData(form));
    navigate('/doctors'); // redirection vers la page résultats
  } catch (err) {
    console.error(err);
  }
}


  return (
    <div className={styles.searchBackground}>
      <div className="container">
        <div className={styles.searchCard}>
          <form className="row g-3 align-items-center" onSubmit={handleSearchClick}>
            {/* Location Input */}
            <div className="col-lg-4 col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${styles.inputGroupText}`}><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                <input type="text" className={`form-control ${styles.formControl}`} placeholder="Location" aria-label="Search criteria" name='ville' value={form.ville} onChange={handleChange} />

              </div>
            </div>

            {/* Search Input */}
            <div className="col-lg-5 col-md-6">
              <div className="input-group">
                <span className={`input-group-text ${styles.inputGroupText}`}><FontAwesomeIcon icon={faSearch} /></span>
                <input type="text" className={`form-control ${styles.formControl}`} placeholder="Médecin, hôpital" aria-label="Search criteria" name='specialite' value={form.specialite} onChange={handleChange} />
              </div>
            </div>

            {/* Search Button */}
            <div className="col-lg-3 col-md-12">
              <button
                type="submit"
                className={`btn w-100 ${styles.searchButton}`}
                style={{ backgroundColor: primaryColor, color: 'white' }}
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

