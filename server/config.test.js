// __tests__/config.test.js

const config = require('../server/config');

describe('Config Module', () => {
    test('should have a mongoURI string', () => {
        expect(typeof config.mongoURI).toBe('string');
        expect(config.mongoURI).toMatch(/^mongodb:\/\/localhost:27017\//);
    });

    test('should have a jwtSecret string', () => {
        expect(typeof config.jwtSecret).toBe('string');
        expect(config.jwtSecret).toBe('hello');
    });
});
