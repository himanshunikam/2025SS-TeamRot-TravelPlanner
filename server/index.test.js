const request = require('supertest');

const App = require('../client/src/App');
// Test für den Ping-End-punkt

describe('Ping endpoint', () => {
    it('should respond with pong', async () => {
        // prüft ob der server auf get Ping korrekt anwortete
        const res = await request(App).get('/ping');
        // Erwartete einen Ok status code also 200
        expect(res.statusCode).toBe(200);
        // erwartete das die antwort pong enthält
        expect(res.text).toBe('pong');
    });
});
