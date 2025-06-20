// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 5000;

// Middleware (IMPORTANT ORDER!)
app.use(cors());
app.use(express.json()); // This must come before routes

// Routes
app.use('/api/todos', todoRoutes);

// DB
mongoose.connect('mongodb+srv://hari_haran:12345@cluster0.sdva6.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB (local) connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });
