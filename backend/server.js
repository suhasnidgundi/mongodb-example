// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const itemRoutes = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));