// Import des styles Bootstrap et personnalisés
import './styles/index.scss';
import React from 'react';

// Import des composants
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Specialties from './components/Specialties/Specialties';
import Doctors from './components/Doctors/Doctors';
import Faq from './components/Faq/Faq';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Specialties />
        <Doctors />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

export default App;
