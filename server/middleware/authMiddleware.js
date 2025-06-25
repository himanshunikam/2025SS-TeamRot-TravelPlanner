// middleware/auth.js

const jwt = require('jsonwebtoken');             // JSON Web Token library for signing and verifying tokens
const config = require('../config');              // Load config (contains jwtSecret)
const User = require('../models/User');           // Mongoose User model

// Authentication middleware to protect routes
const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header ("Bearer <token>")
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // If no token provided, deny access
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token and decode payload
        const decoded = jwt.verify(token, config.jwtSecret);

        // Find the user by ID stored in token payload, exclude password field
        const user = await User.findById(decoded.user.id).select('-password');
        if (!user) {
            // If user does not exist, invalid token
            return res.status(401).json({ message: 'Token is not valid' });
        }

        // Attach user ID to request object for downstream handlers
        req.user = { id: decoded.user.id };
        next();   // Proceed to next middleware or route handler
    } catch (error) {
        console.error('Auth middleware error:', error);
        // On error (invalid token, expired, etc), deny access
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;   // Export middleware to use in routes
