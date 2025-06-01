import './styles/index.scss';
import React from 'react';

// Import du layout principal
import Layout from './layouts/layout';

// Import des pages/sections
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Faq from './components/Faq/Faq';
import DoctorsPage from './components/DoctorsPage';
import PatientRegisterForm from './components/PatientRegisterForm';
import MedecinRegester from './components/MedecinRegister'  ; 
import SendVerificationCode from './components/SendVerificationCode';
import LoginMedecin from './components/LoginMedecin' ; 
import LoginPatient from './components/loginPatient';
function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage  />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/LoginPatient" element={<LoginPatient />} /> 
            <Route path="/LoginMedecin" element={<LoginMedecin/>}/>
            <Route path="/PatientRegister" element={<PatientRegisterForm />} />
            <Route path="/MedecinRegester" element={<MedecinRegester/>} />
            <Route path="/SendVerificationCode" element={<SendVerificationCode />} />
            
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
export default App;