// components/FAQ.js
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './FAQ.module.css';

const FAQ = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <div 
        className={styles.faqQuestion} 
        onClick={() => setOpen(!open)}
        aria-controls="faq-collapse"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={styles.toggleIcon}>
          {open ? 
            <i className="fas fa-minus"></i> : 
            <i className="fas fa-plus"></i>
          }
        </span>
      </div>
      <Collapse in={open}>
        <div id="faq-collapse" className={styles.faqAnswer}>
          {answer}
        </div>
      </Collapse>
    </div>
  );
};

export default FAQ;