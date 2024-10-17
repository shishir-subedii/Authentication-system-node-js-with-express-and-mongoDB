const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const dbConnect = require('./config/db'); // Ensure the correct path to db.js
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

// Error handling middleware should be the last middleware
app.use(errorMiddleware);

// Connect to the database
dbConnect(); // Connect to the database here

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} on ${new Date()}`);
});
