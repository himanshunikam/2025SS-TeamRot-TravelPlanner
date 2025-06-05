// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);

const PORT = process.env.PORT || 4500;
app.get('/ping', (req, res) => {
    console.log('✅ Ping received');
    res.send('pong');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));