// const crypto = require('crypto');
import crypto from 'crypto' ; 

// Génère un code sécurisé
const generateSecureCode = (length = 6) => {
  const buffer = crypto.randomBytes(Math.ceil(length / 2));
  return buffer.toString('hex').slice(0, length).toUpperCase();
};

// Génère un code numérique simple
const generateNumericCode = (length = 6) => {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

// Code mixte (chiffres + lettres)
const generateMixedCode = (length = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((byte) => chars[byte % chars.length])
    .join('');
};

// Code temporel (code + timestamp)
const generateTemporalCode = () => {
  const timestamp = Date.now().toString().slice(-4);
  return generateNumericCode(4) + timestamp;
};

 
export default generateNumericCode ; 