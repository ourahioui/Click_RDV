import React from 'react';
import Hero from '../components/Hero/Hero';
import Specialties from '../components/Specialties/Specialties';
import Doctors from '../components/Doctors/Doctors';
import Faq from '../components/Faq/Faq';

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