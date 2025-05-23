// index.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginUser from './components/LoginUser.js';
import Useregister from './components/Useregister.js' ; 
import SendVerificationCode from './components/SendVerificationCode.js' ; 
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
