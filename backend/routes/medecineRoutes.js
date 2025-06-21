import express from 'express';
import MedecinController from '../controllers/MedecinController.js';

const router = express.Router();
import multer from 'multer' ; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // dossier où les fichiers sont stockés
  },
  filename: function (req, file, cb) {
     cb(null, file.originalname);
  }
});
const upload = multer({  storage });

router.get('/', MedecinController.search);
router.get('/:id', MedecinController.getById);
router.post('/', MedecinController.create);
router.put('/:id',MedecinController.update);
router.delete('/:id', MedecinController.delete);
router.post('/UpdateProfile',upload.single('photo'),MedecinController.update) ; 

export default router;
