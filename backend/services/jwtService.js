// server/services/jwtService.js
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(); // Charge les variables d'environnement

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRATION = '15m'; // Expiration des tokens

export const generateToken = (payload) => {
  return jwt.sign(
    {
      ...payload,
      iat: Math.floor(Date.now() / 1000) // Heure d'émission
    },
    JWT_SECRET,
    { expiresIn: EXPIRATION }
  );
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { 
      valid: true, 
      payload: decoded,
      reason: null 
    };
  } catch (error) {
    return {
      valid: false,
      payload: null,
      reason: error.message
    };
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};

// Fonction utilitaire pour les tokens de vérification
export const generateVerificationToken = (email, code) => {
  return generateToken({
    type: 'email_verification',
    email,
    code
  });
};

// Fonction de vérification spécifique
export const verifyVerificationToken = (token) => {
  const result = verifyToken(token);
  
  if (!result.valid) return result;
  
  if (result.payload.type !== 'email_verification') {
    return {
      valid: false,
      reason: 'Invalid token type'
    };
  }

  return result;
};