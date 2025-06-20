const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const config = require('../config');

// Mock User model
jest.mock('../models/User');

const app = express();
app.use(express.json());
app.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'Access granted', userId: req.user.id });
});

describe('Auth Middleware', () => {
    const userId = '12345';
    const userPayload = { user: { id: userId } };
    const token = jwt.sign(userPayload, config.jwtSecret);

    let consoleErrorSpy;

    beforeAll(() => {
        // Suppress error output during tests
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        // Restore original console.error
        consoleErrorSpy.mockRestore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should allow access with a valid token and user', async () => {
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({ _id: userId, name: 'Test User' }),
        });

        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Access granted', userId });
        expect(User.findById).toHaveBeenCalledWith(userId);
    });

    it('should deny access when no token is provided', async () => {
        const res = await request(app).get('/protected');

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('No token, authorization denied');
    });

    it('should deny access with an invalid token', async () => {
        const res = await request(app)
            .get('/protected')
            .set('Authorization', 'Bearer invalid.token.here');

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token is not valid');
    });

    it('should deny access when user is not found', async () => {
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue(null),
        });

        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token is not valid');
    });

    it('should handle jwt.verify throwing an error', async () => {
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const res = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token is not valid');

        jwt.verify.mockRestore();
    });
});
