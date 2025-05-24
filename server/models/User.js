// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedDestinations: [{
        name: {
            type: String,
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    savedAttractions: [{
        attractionId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cityId: {
            type: String,
            required: true
        },
        cityName: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('User', UserSchema);