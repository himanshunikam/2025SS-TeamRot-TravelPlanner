jest.setTimeout(30000); // ⬅️ Add this line at the very top

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri()); // Clean & modern
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('User Model', () => {
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

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe('testuser');
        expect(savedUser.savedDestinations[0].name).toBe('Paris');
        expect(savedUser.savedAttractions[0].name).toBe('Eiffel Tower');
        expect(savedUser.savedDestinations[0].addedAt).toBeInstanceOf(Date);
        expect(savedUser.savedAttractions[0].addedAt).toBeInstanceOf(Date);
    });

    it('should throw validation error if required fields are missing', async () => {
        const user = new User({});

        let err;
        try {
            await user.validate();
        } catch (error) {
            err = error;
        }

        expect(err).toBeDefined();
        expect(err.errors.username).toBeDefined();
        expect(err.errors.password).toBeDefined();
    });

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
