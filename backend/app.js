import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import medecinRoutes from './routes/medecineRoutes.js';
// import { rateLimiter } from './middlewares/rateLimit.js';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(rateLimiter);

app.use('/auth', authRoutes);
app.use("/api/medecins",medecinRoutes);


app.listen(5000, () => {
  console.log('Serveur démarré sur le port 5000');
});