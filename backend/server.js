require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001', 
    credentials: true,
     allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(limiter);
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/videoRoutes'));

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));