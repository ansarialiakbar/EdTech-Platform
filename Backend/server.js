import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import aiProfileRoutes from './routes/aiProfileRoutes.js';

dotenv.config();
const app = express();

//  Use CLIENT_URL from .env for CORS
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
    res.send("Backend is running!");
});
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/ai-profile-matcher', aiProfileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
