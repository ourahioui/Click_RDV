import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import medecinRoutes from './routes/medecineRoutes.js';
import villesRoutes from "./routes/villesRoutes.js";
import specialitesRoutes from "./routes/specialitesRoutes.js";
import disponibiltesRoutes from './routes/disponibilitesRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import rendezVousRoutes from './routes/rendez_vousRoutes.js';
// import { rateLimiter } from './middlewares/rateLimit.js';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(rateLimiter);

app.use('/auth', authRoutes);
app.use("/api/medecins",medecinRoutes);
app.use("/api/villes",villesRoutes);
app.use("/api/specialites",specialitesRoutes);
app.use('/api/disponibilites', disponibiltesRoutes);
app.use('/api/users', patientRoutes);
app.use('/api/rendez-vous', rendezVousRoutes);



app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});