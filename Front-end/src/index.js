// index.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginUser from './components/LoginUser.js';
import Useregister from './components/Useregister.js' ; 
import SendVerificationCode from './components/SendVerificationCode.js' ; 
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<App />} />
          <Route path="/LoginUser" element={<LoginUser />} />
          <Route path="/Useregister" element={<Useregister/>} />
          <Route path="/SendVerificationCode" element={<SendVerificationCode/>}/>
    </Routes>
    {/* <App /> */}
    </BrowserRouter>

  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
