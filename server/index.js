const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');

const app = express();

const corsOptions = {
    origin:`http://localhost:3000`,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);

app.get('/ping', (req, res) => {
    console.log('Ping received');
    res.send('pong');
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
