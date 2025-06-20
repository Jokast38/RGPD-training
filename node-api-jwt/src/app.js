const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: 'http://localhost:3001', // adapte selon ton port frontend
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
