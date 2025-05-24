// server/routes/destinations.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get saved destinations
router.get('/saved', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('savedDestinations');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.savedDestinations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a destination
router.post('/add', auth, async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ msg: 'Destination name is required' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if destination already exists
        const exists = user.savedDestinations.some(dest =>
            dest.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            return res.status(400).json({ msg: 'Destination already saved' });
        }

        user.savedDestinations.push({ name: name.trim() });
        await user.save();

        res.json(user.savedDestinations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Remove a destination
router.delete('/remove/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.savedDestinations = user.savedDestinations.filter(
            dest => dest._id.toString() !== req.params.id
        );

        await user.save();
        res.json(user.savedDestinations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;