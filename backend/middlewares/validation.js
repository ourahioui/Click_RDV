// Validation basique de l'email
export const validateEmail = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Format email invalide'
    });
  }
  next();
};

// Validation du code à 6 chiffres
export const validateCode = (req, res, next) => {
  if (!/^\d{6}$/.test(req.body.code)) {
    return res.status(400).json({ 
      success: false,
      message: 'Le code doit contenir 6 chiffres'
    });
  }
  next();
};