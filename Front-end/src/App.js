import './styles/index.scss';
import React from 'react';

// Import du layout principal
import Layout from './layouts/layout';

// Import des pages/sections
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Doctors from './components/Doctors/Doctors';
import Faq from './components/Faq/Faq';
import Login from './components/LoginUser';
import UserRegisterForm from './components/Useregister.js';
// import SendVerificationCode from './pages/SendVerificationCode';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Useregister" element={<UserRegisterForm />} />
            {/* <Route path="/SendVerificationCode" element={<SendVerificationCode />} /> */}
            {/* <Route path="/forgot-password" element={<SendVerificationCode />} /> */}
             
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
export default App;