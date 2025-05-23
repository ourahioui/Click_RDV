import React from 'react';
import Hero from './Hero/Hero';
import Specialties from './Specialties/Specialties';
import Doctors from './Doctors/Doctors';
import Faq from './Faq/Faq';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Specialties />
      <Doctors />
      <Faq />
    </>
  );
};

export default HomePage;