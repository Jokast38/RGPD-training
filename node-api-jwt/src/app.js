const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
db();

// Routes
app.use('/api/auth', authRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});