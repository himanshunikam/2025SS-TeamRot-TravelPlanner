const request = require('supertest');
const App = require('../client/src/App');

describe('Ping endpoint', () => {
    it('should respond with pong', async () => {
        const res = await request(App).get('/ping');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('pong');
    });
});
