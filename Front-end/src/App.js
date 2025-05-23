import './styles/index.scss';
import React from 'react';

// Import du layout principal
import Layout from './layouts/layout';

// Import des pages/sections
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Faq from './components/Faq/Faq';
import Login from './pages/Login';
import UserRegisterForm from './pages/UserRegisterForm';
import SendVerificationCode from './pages/SendVerificationCode';
import DoctorsPage from './components/DoctorsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage  />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Useregister" element={<UserRegisterForm />} />
            <Route path="/SendVerificationCode" element={<SendVerificationCode />} />

          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
export default App;