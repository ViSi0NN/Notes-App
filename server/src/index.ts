import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});