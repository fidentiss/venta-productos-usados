import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Necesario para ES Modules
import sendTelegramOfferRouter from './api/sendTelegramOffer.js'; // Asegúrate de tener .js en la ruta

dotenv.config();

// Configuración para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Usar el router de la API
app.use('/api', sendTelegramOfferRouter);

// Servir archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, '../dist')));

// Manejar todas las demás rutas y servir index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
