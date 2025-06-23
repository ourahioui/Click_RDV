import './styles/index.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import du layout principal
import Layout from './layouts/layout';

// Import des pages/sections
import HomePage from './components/HomePage';
import Faq from './components/Faq/Faq';
import DoctorsPage from './components/DoctorsPage';
import PatientRegisterForm from './components/PatientRegisterForm';
import MedecinRegester from './components/MedecinRegister'; 
import SendVerificationCode from './components/SendVerificationCode';
import LoginMedecin from './components/LoginMedecin';
import LoginPatient from './components/loginPatient';
import ProfilePatient from './components/ProfilePatient';
import ProfileMedecin from './components/ProfileMedecin';
import Medecin_generaliste from './components/Doctors/Medecin_generaliste';
import ProfilMedicalTabs from './components/MedicalProfileTabs.jsx';
import Mes_rendez_vous from './components/mes_rendez_vous/mes_rendez_vous.js';

function App() {
  const token = localStorage.getItem("token") || '';
  const decoded = token ? jwtDecode(token) : null;
  const isMedecin = decoded?.role === "medecins";

  // Fonction pour déterminer si le layout doit être affiché
  const shouldShowLayout = (path) => {
    // Ne pas afficher le layout pour les routes spécifiques des médecins
    if (isMedecin && (path === "/Profile" || path === "/mes-rendez-vous")) {
      return false;
    }
    return true;
  };

  // Composant de route conditionnelle
  const ConditionalRoute = ({ element, path, ...props }) => {
    return shouldShowLayout(path) ? (
      <Layout>
        {element}
      </Layout>
    ) : (
      element
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <ConditionalRoute 
              path="/" 
              element={<HomePage />} 
            />
          } />
          <Route path="/doctors" element={
            <ConditionalRoute 
              path="/doctors" 
              element={<DoctorsPage />} 
            />
          } />
          <Route path="/faq" element={
            <ConditionalRoute 
              path="/faq" 
              element={<Faq />} 
            />
          } />
          <Route path="/LoginPatient" element={
            <ConditionalRoute 
              path="/LoginPatient" 
              element={<LoginPatient />} 
            />
          } />
          <Route path="/LoginMedecin" element={
            <ConditionalRoute 
              path="/LoginMedecin" 
              element={<LoginMedecin />} 
            />
          } />
          <Route path="/PatientRegister" element={
            <ConditionalRoute 
              path="/PatientRegister" 
              element={<PatientRegisterForm />} 
            />
          } />
          <Route path="/MedecinRegester" element={
            <ConditionalRoute 
              path="/MedecinRegester" 
              element={<MedecinRegester />} 
            />
          } />
          <Route path="/SendVerificationCode" element={
            <ConditionalRoute 
              path="/SendVerificationCode" 
              element={<SendVerificationCode />} 
            />
          } />
          <Route path="/Profile" element={
            decoded?.role === "medecins" ? (
              <ProfilMedicalTabs id={decoded.id} />
            ) : decoded?.role === "patient" ? (
              <ConditionalRoute 
                path="/Profile" 
                element={<ProfilePatient id={decoded.id} />} 
              />
            ) : (
              <ConditionalRoute 
                path="/Profile" 
                element={<LoginPatient />} 
              />
            )
          } />
          <Route path="/medecin-generaliste" element={
            <ConditionalRoute 
              path="/medecin-generaliste" 
              element={<Medecin_generaliste />} 
            />
          } />
          <Route path="/mes-rendez-vous" element={
            isMedecin ? (
              <Mes_rendez_vous />
            ) : (
              <ConditionalRoute 
                path="/mes-rendez-vous" 
                element={<Mes_rendez_vous />} 
              />
            )
          } />
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} />
      </div>
    </Router>
  );
}

export default App;