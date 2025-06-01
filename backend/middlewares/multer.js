// config/multer.js
import path from 'path' ; 
import multer from 'multer' ; 

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads'); // Dossier où tu veux stocker les images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// module.exports = upload;
export default upload ;
