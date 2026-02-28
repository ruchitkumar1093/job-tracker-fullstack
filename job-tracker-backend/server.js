require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobsRoutes = require('./routes/jobsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

// Test route
app.get('/', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.send('Job Tracker API + MySQL Connected 🚀');
    } catch (error) {
        console.error(error);
        res.status(500).send('Database connection failed');
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});