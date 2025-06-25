// setze erstmal das globale timout für Jest auf 30 sekunden
jest.setTimeout(30000);

// lade das mongoose Object für MongoDB
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
// variable für den  MongoDB-Server
let mongoServer;
// Startet eine Memory-server und stelle ien verbindung zu Mongoose bevor alle Test starten
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri()); // Clean & modern
});

// Verbindung wieder schließen uun Server runterfahren nach testen
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// State nach jedem test sauber machen also die benutzer Dokumente entfernen
afterEach(async () => {
    await User.deleteMany({});
});

// Test für das Mongosse-Model
describe('User Model', () => {

    // es soll eine user erfolgreich speichern mit alle notwendigen Daten
    it('should create and save a user successfully', async () => {
        const userData = {
            username: 'testuser',
            password: 'securepassword123',
            savedDestinations: [{ name: 'Paris' }],
            savedAttractions: [{
                attractionId: 'abc123',
                name: 'Eiffel Tower',
                cityId: 'paris001',
                cityName: 'Paris',
                image: 'eiffel.jpg'
            }]
        };
         // erstellt eine User-instanz
        const user = new User(userData);
        const savedUser = await user.save();

        // hier wird erwartete, dass alle Felder korrekt gesetzt wird und , dass MongoDB eine ID erzeugt
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe('testuser');
        expect(savedUser.savedDestinations[0].name).toBe('Paris');
        expect(savedUser.savedAttractions[0].name).toBe('Eiffel Tower');
        expect(savedUser.savedDestinations[0].addedAt).toBeInstanceOf(Date);
        expect(savedUser.savedAttractions[0].addedAt).toBeInstanceOf(Date);
    });

    // Prüft die strukture Gultigkeit (ob  fehlende Pflichtfelder also username, password validiert werden)
    it('should throw validation error if required fields are missing', async () => {
        const user = new User({});

        let err;
        try {
            await user.validate(); // rüft nur die validierung auf und speicher es nicht
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
    });
     // prüft die Struktur in saveDestination
    it('should throw validation error for invalid savedDestination structure', async () => {
        const user = new User({
            username: 'tester',
            password: 'test123',
            savedDestinations: [{}]
        });

        let err;
        try {
            await user.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors['savedDestinations.0.name']).toBeDefined();
    });
    // prüft, ob die savedAttractions einträge vollständig ist oder nicht
    it('should throw validation error for missing fields in savedAttractions', async () => {
        const user = new User({
            username: 'tester2',
            password: 'test123',
            savedAttractions: [
                { attractionId: 'xyz' }
            ]
        });

        let err;
        try {
            await user.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors['savedAttractions.0.name']).toBeDefined();
        expect(err.errors['savedAttractions.0.cityId']).toBeDefined();
        expect(err.errors['savedAttractions.0.cityName']).toBeDefined();
    });
});
