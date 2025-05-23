import './styles/index.scss';
import React from 'react';

// Import du layout principal
import Layout from './layouts/layout';

// Import des pages/sections
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Doctors from './components/Doctors/Doctors';
import Faq from './components/Faq/Faq';
import Login from './pages/Login';
import UserRegisterForm from './pages/UserRegisterForm';

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
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
export default App;