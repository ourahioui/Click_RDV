import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';
import Nav from 'react-bootstrap/Nav';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const primaryColor = '#2AA7FF';

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (pageNumber, e) => {
    e.preventDefault();
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const ellipsis = (
      <li key="ellipsis" className={`page-item disabled ${styles.pageItem}`}>
        <Nav.Link className={`page-link ${styles.pageLink}`} disabled>...</Nav.Link>
      </li>
    );

    // Previous Button
    pageNumbers.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''} ${styles.pageItem}`}>
        <Nav.Link
          className={`page-link ${styles.pageLink}`}
          href="#"
          aria-label="Previous"
          onClick={(e) => handlePageClick(currentPage - 1, e)}
          disabled={currentPage === 1}
        >
          <span aria-hidden="true">&laquo;</span>
        </Nav.Link>
      </li>
    );

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? styles.active : ''} ${styles.pageItem}`}>
            <Nav.Link
              className={`page-link ${styles.pageLink}`}
              href="#"
              onClick={(e) => handlePageClick(i, e)}
              style={currentPage === i ? { backgroundColor: primaryColor, color: 'white', borderColor: primaryColor } : {}}
              active={currentPage === i}
            >
              {i}
            </Nav.Link>
          </li>
        );
      }
    } else {
      pageNumbers.push(
        <li key={1} className={`page-item ${currentPage === 1 ? styles.active : ''} ${styles.pageItem}`}>
          <Nav.Link
            className={`page-link ${styles.pageLink}`}
            href="#"
            onClick={(e) => handlePageClick(1, e)}
            style={currentPage === 1 ? { backgroundColor: primaryColor, color: 'white', borderColor: primaryColor } : {}}
            active={currentPage === 1}
          >
            1
          </Nav.Link>
        </li>
      );

      if (currentPage > 3) {
        pageNumbers.push(React.cloneElement(ellipsis, { key: 'start-ellipsis' }));
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, 4);
      }
      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
        endPage = totalPages - 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? styles.active : ''} ${styles.pageItem}`}>
            <Nav.Link
              className={`page-link ${styles.pageLink}`}
              href="#"
              onClick={(e) => handlePageClick(i, e)}
              style={currentPage === i ? { backgroundColor: primaryColor, color: 'white', borderColor: primaryColor } : {}}
              active={currentPage === i}
            >
              {i}
            </Nav.Link>
          </li>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(React.cloneElement(ellipsis, { key: 'end-ellipsis' }));
      }

      pageNumbers.push(
        <li key={totalPages} className={`page-item ${currentPage === totalPages ? styles.active : ''} ${styles.pageItem}`}>
          <Nav.Link
            className={`page-link ${styles.pageLink}`}
            href="#"
            onClick={(e) => handlePageClick(totalPages, e)}
            style={currentPage === totalPages ? { backgroundColor: primaryColor, color: 'white', borderColor: primaryColor } : {}}
            active={currentPage === totalPages}
          >
            {totalPages}
          </Nav.Link>
        </li>
      );
    }

    // Next Button
    pageNumbers.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''} ${styles.pageItem}`}>
        <Nav.Link
          className={`page-link ${styles.pageLink}`}
          href="#"
          aria-label="Next"
          onClick={(e) => handlePageClick(currentPage + 1, e)}
          disabled={currentPage === totalPages}
        >
          <span aria-hidden="true">&raquo;</span>
        </Nav.Link>
      </li>
    );

    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation" className={`d-flex justify-content-center ${styles.paginationNav}`}>
      <ul className={`pagination ${styles.paginationUl}`}>
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
