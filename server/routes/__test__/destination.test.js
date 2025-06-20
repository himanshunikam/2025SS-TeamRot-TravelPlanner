// server/destinations.test.js
const request = require('supertest');
const app = require('./index');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const config = require('./config');

describe('Destinations API', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Create a test user
        const user = new User({ username: 'testuser', password: 'hashedpassword' });
        await user.save();
        userId = user._id;

        // Generate JWT token for test user
        token = jwt.sign({ user: { id: userId } }, config.jwtSecret, { expiresIn: '1h' });
    });

    afterAll(async () => {
        await User.deleteMany({});
    });

    it('GET /api/destinations/saved should return empty array initially', async () => {
        const res = await request(app)
            .get('/api/destinations/saved')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
});
