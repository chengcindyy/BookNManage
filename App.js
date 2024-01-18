import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';
import cors from 'cors';
import bookingsRoutes from './routes/bookingRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// app.use(cors({
//     origin: 'http://yourfrontenddomain.com'
//   }));
  
app.use(express.json());

// Use routes
app.use('/api', userRoutes);
app.use('/api', bookingsRoutes);
app.use('/api', providerRoutes);
app.use('/api', roleRoutes);

// Production build
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});

