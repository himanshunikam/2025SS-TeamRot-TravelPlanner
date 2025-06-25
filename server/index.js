const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');

// Create an instance of an Express application
const app = express();

// CORS configuration to allow requests from the React frontend on localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',  // Frontend URL
    credentials: true,                // Allow cookies/auth headers
    optionsSuccessStatus: 200         // Some legacy browsers choke on 204
};

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());
// Enable CORS with the above options
app.use(cors(corsOptions));

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mount authentication routes under /api/auth
app.use('/api/auth', authRoutes);
// Mount destinations routes (includes saved destinations & attractions) under /api/destinations
app.use('/api/destinations', destinationRoutes);

// A simple health-check endpoint
app.get('/ping', (req, res) => {
    console.log('Ping received');
    res.send('pong');
});

// Start the server on the specified PORT (defaults to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
