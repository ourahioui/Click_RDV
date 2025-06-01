
// UserRegistrationForm.jsx
import React, { useState } from 'react';
import LoginUser from '../layouts/LoginUser' ; 
export default function LoginMedecin()
{
    
    return (
        <LoginUser RegisterPath="/MedecinRegester"  LoginPath="Login-patient" SearchTable="medecins"/>
        
    )
}