import pool from '../config/db.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { generateToken, verifyToken } from '../services/jwtService.js';

export const sendVerificationCode = async (email) => {
  const code = Math.floor(100000 + Math.random() * 900000);
  const token = generateToken({ email, code });
  
  await pool.execute(
    `INSERT INTO users (email, verification_code)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE verification_code = ?`,
    [email, code, code]
  );

  await sendVerificationEmail(email, code);
  return token;
};

export const verifyEmailCode = async (email, code) => {
  const [rows] = await pool.execute(
    `SELECT verification_code FROM users WHERE email = ?`,
    [email]
  );
  
  return rows[0]?.verification_code === code;
};