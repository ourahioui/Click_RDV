import './styles/index.scss';
import React, { useState } from 'react';

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
import ProfilePatient from './components/ProfilePatient' ;
import ProfileMedecin from './components/ProfileMedecin'  ;
import Medecin_generaliste from './components/Doctors/Medecin_generaliste' ;
import ProfilMedicalTabs from './components/MedicalProfileTabs.jsx' ; 
import { jwtDecode } from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
   
  
  //  const [token,settoken] = useState(localStorage.getItem("token")) ;
  // const [decoded,setdecoded] = useState(jwtDecode(token)) ;

   const token =localStorage.getItem("token")? localStorage.getItem("token"):'';
   const decoded = token?jwtDecode(token):'' ; 
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
            <Route path="Profile" element={
              // decoded?.role==="medecins"?<ProfileMedecin id={decoded.id}/>:
              decoded?.role==="medecins"?<ProfilMedicalTabs id={decoded.id}/>:
              decoded?.role==="patient"?<ProfilePatient id={decoded.id}/>:
              <LoginPatient/>
              }/> 
              <Route path="/medecin-generaliste" element={<Medecin_generaliste/>}/>
          </Routes>
                <ToastContainer position="top-center" autoClose={2500} />

        </Layout>
      </div>
    </Router>
  );     
}
export default App;