import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import medecinRoutes from './routes/medecineRoutes.js';
import patientRoutes from './routes/patientRoutes.js'  ;
import rendezvousRoutes from './routes/rendezvousRoutes.js' ; 
import path from 'path' ;
import {dirname} from 'path' ;
import {fileURLToPath} from 'url' ; 
// import { rateLimiter } from './middlewares/rateLimit.js';
const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = dirname(__filename) ; 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(rateLimiter);

app.use('/auth', authRoutes);
app.use("/api/medecins",medecinRoutes);
app.use("/patient",patientRoutes) ; 
app.use("/RendezVous",rendezvousRoutes) ; 

app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});