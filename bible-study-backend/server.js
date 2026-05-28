const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. First, create the app instance
const app = express();

// 2. Add global middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON bodies

// 3. Import your custom routes
const inspirationRoutes = require('./routes/inspirationRoutes');

// 4. Attach your custom routes to the app instance
app.use('/api/inspiration', inspirationRoutes);

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((err) => console.error('Database connection error:', err));

// Quick Health Check Route
app.get('/', (req, res) => {
  res.send('Bible Study Portal API is running...');
});

// 6. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing gracefully on port ${PORT}`);
});