// __tests__/config.test.js
// hier wird das Config Modul importiert
const config = require('../server/config');
// die zusammen gehörigen Config-test werden erstmal gruppietr
describe('Config Module', () => {
    // teste, ob die Eigenschaft `mongoURI` im Config ein String ist
    // und ob sie dem erwarteten Format einer MongoDB-URI entspricht
    test('should have a mongoURI string', () => {
        expect(typeof config.mongoURI).toBe('string');
        // hier erwarte ich das der `mongoURI` mit "mongodb://localhost:27017/"
        expect(config.mongoURI).toMatch(/^mongodb:\/\/localhost:27017\//);
    });
    // hier prüfe ich, ob die Eigenschaft `jwtSecret` im Config ein String ist
    // und ob sie genau den Wert "hello" hast
    test('should have a jwtSecret string', () => {
        expect(typeof config.jwtSecret).toBe('string');
        expect(config.jwtSecret).toBe('hello');
    });
});
