import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite par IP
  message: {
    success: false,
    message: 'Trop de tentatives, réessayez plus tard'
  }
});