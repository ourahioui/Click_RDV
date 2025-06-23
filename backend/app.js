import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import medecinRoutes from './routes/medecineRoutes.js';
 import path from 'path' ;
import {dirname} from 'path' ;
import {fileURLToPath} from 'url' ; 
import villesRoutes from "./routes/villesRoutes.js";
import specialitesRoutes from "./routes/specialitesRoutes.js";
import disponibiltesRoutes from './routes/disponibilitesRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import rendezVousRoutes from './routes/rendezvousRoutes.js';
 
const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = dirname(__filename) ; 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 

app.use('/auth', authRoutes);
app.use("/api/medecins",medecinRoutes);
app.use("/patient",patientRoutes) ;
app.use("/RendezVous",rendezVousRoutes) ;
app.use("/api/villes",villesRoutes);
app.use("/api/specialites",specialitesRoutes);
app.use('/api/disponibilites', disponibiltesRoutes);



app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});