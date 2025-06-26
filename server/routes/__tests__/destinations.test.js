// server/routes/__tests__/destinations.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const destinationsRouter = require('../destinations');
const User = require('../../models/User');

// Mock the auth middleware
jest.mock('../../middleware/authMiddleware', () => {
    return (req, res, next) => {
        req.user = { id: 'mockUserId123' };
        next();
    };
});

// Mock the User model
jest.mock('../../models/User');

// Create Express app for testing
const app = express();
app.use(express.json());
app.use('/api/destinations', destinationsRouter);

describe('Destinations Routes', () => {
    let mockUser;

    beforeEach(() => {
        jest.clearAllMocks();

        // Default mock user
        mockUser = {
            _id: 'mockUserId123',
            savedDestinations: [],
            savedAttractions: [],
            save: jest.fn().mockResolvedValue(true)
        };
    });

    describe('GET /api/destinations/saved', () => {
        test('should get saved destinations for authenticated user', async () => {
            const savedDestinations = [
                { _id: '1', name: 'Paris' },
                { _id: '2', name: 'Tokyo' }
            ];

            mockUser.savedDestinations = savedDestinations;
            User.findById = jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });

            const response = await request(app)
                .get('/api/destinations/saved')
                .expect(200);

            expect(response.body).toEqual(savedDestinations);
            expect(User.findById).toHaveBeenCalledWith('mockUserId123');
        });

        test('should return 404 if user not found', async () => {
            User.findById = jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            });

            const response = await request(app)
                .get('/api/destinations/saved')
                .expect(404);

            expect(response.body.msg).toBe('User not found');
        });

        test('should handle server errors', async () => {
            User.findById = jest.fn().mockReturnValue({
                select: jest.fn().mockRejectedValue(new Error('Database error'))
            });

            await request(app)
                .get('/api/destinations/saved')
                .expect(500);
        });
    });

    describe('POST /api/destinations/add', () => {
        test('should add a new destination', async () => {
            const newDestination = { name: 'Rome' };

            User.findById = jest.fn().mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/destinations/add')
                .send(newDestination)
                .expect(200);

            expect(mockUser.savedDestinations).toContainEqual(
                expect.objectContaining({ name: 'Rome' })
            );
            expect(mockUser.save).toHaveBeenCalled();
            expect(response.body).toEqual(mockUser.savedDestinations);
        });

        test('should trim destination name', async () => {
            const newDestination = { name: '  Barcelona  ' };

            User.findById = jest.fn().mockResolvedValue(mockUser);

            await request(app)
                .post('/api/destinations/add')
                .send(newDestination)
                .expect(200);

            expect(mockUser.savedDestinations).toContainEqual(
                expect.objectContaining({ name: 'Barcelona' })
            );
        });

        test('should return 400 if name is missing', async () => {
            const response = await request(app)
                .post('/api/destinations/add')
                .send({})
                .expect(400);

            expect(response.body.msg).toBe('Destination name is required');
        });

        test('should return 400 if name is empty or whitespace', async () => {
            const response = await request(app)
                .post('/api/destinations/add')
                .send({ name: '   ' })
                .expect(400);

            expect(response.body.msg).toBe('Destination name is required');
        });

        test('should return 400 if destination already exists', async () => {
            mockUser.savedDestinations = [{ name: 'Paris' }];
            User.findById = jest.fn().mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/destinations/add')
                .send({ name: 'paris' }) // case insensitive check
                .expect(400);

            expect(response.body.msg).toBe('Destination already saved');
        });

        test('should return 404 if user not found', async () => {
            User.findById = jest.fn().mockResolvedValue(null);

            const response = await request(app)
                .post('/api/destinations/add')
                .send({ name: 'Rome' })
                .expect(404);

            expect(response.body.msg).toBe('User not found');
        });
    });

    describe('DELETE /api/destinations/remove/:id', () => {
        test('should remove a destination', async () => {
            const destinationId = '507f1f77bcf86cd799439011';
            mockUser.savedDestinations = [
                { _id: { toString: () => destinationId }, name: 'Paris' },
                { _id: { toString: () => '507f1f77bcf86cd799439012' }, name: 'Tokyo' }
            ];

            User.findById = jest.fn().mockResolvedValue(mockUser);

            const response = await request(app)
                .delete(`/api/destinations/remove/${destinationId}`)
                .expect(200);

            expect(mockUser.savedDestinations).toHaveLength(1);
            expect(mockUser.savedDestinations[0].name).toBe('Tokyo');
            expect(mockUser.save).toHaveBeenCalled();
        });

        test('should return 404 if user not found', async () => {
            User.findById = jest.fn().mockResolvedValue(null);

            const response = await request(app)
                .delete('/api/destinations/remove/507f1f77bcf86cd799439011')
                .expect(404);

            expect(response.body.msg).toBe('User not found');
        });
    });

    describe('GET /api/destinations/attractions/saved', () => {
        test('should get saved attractions for authenticated user', async () => {
            const savedAttractions = [
                {
                    _id: '1',
                    attractionId: 'eiffel-tower',
                    name: 'Eiffel Tower',
                    cityId: 'paris',
                    cityName: 'Paris'
                }
            ];

            mockUser.savedAttractions = savedAttractions;
            User.findById = jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });

            const response = await request(app)
                .get('/api/destinations/attractions/saved')
                .expect(200);

            expect(response.body).toEqual(savedAttractions);
        });
    });

    describe('POST /api/destinations/attractions/add', () => {
        test('should add a new attraction', async () => {
            const newAttraction = {
                attractionId: 'eiffel-tower',
                name: 'Eiffel Tower',
                cityId: 'paris',
                cityName: 'Paris',
                image: '/images/eiffeltower.jpg'
            };

            User.findById = jest.fn().mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/api/destinations/attractions/add')
                .send(newAttraction)
                .expect(200);

            expect(mockUser.savedAttractions).toContainEqual(
                expect.objectContaining({
                    attractionId: 'eiffel-tower',
                    name: 'Eiffel Tower',
                    cityId: 'paris',
                    cityName: 'Paris'
                })
            );
            expect(mockUser.save).toHaveBeenCalled();
        });

        test('should trim attraction name', async () => {
            const newAttraction = {
                attractionId: 'louvre-museum',
                name: '  Louvre Museum  ',
                cityId: 'paris',
                cityName: 'Paris'
            };

            User.findById = jest.fn().mockResolvedValue(mockUser);

            await request(app)
                .post('/api/destinations/attractions/add')
                .send(newAttraction)
                .expect(200);

            expect(mockUser.savedAttractions).toContainEqual(
                expect.objectContaining({ name: 'Louvre Museum' })
            );
        });

        test('should return 400 if required fields are missing', async () => {
            const incompleteAttraction = {
                attractionId: 'eiffel-tower',
                name: 'Eiffel Tower'
                // missing cityId and cityName
            };

            const response = await request(app)
                .post('/api/destinations/attractions/add')
                .send(incompleteAttraction)
                .expect(400);

            expect(response.body.msg).toBe('All attraction details are required');
        });

        test('should return 400 if attraction already exists', async () => {
            mockUser.savedAttractions = [
                { attractionId: 'eiffel-tower', name: 'Eiffel Tower' }
            ];
            User.findById = jest.fn().mockResolvedValue(mockUser);

            const newAttraction = {
                attractionId: 'eiffel-tower',
                name: 'Eiffel Tower',
                cityId: 'paris',
                cityName: 'Paris'
            };

            const response = await request(app)
                .post('/api/destinations/attractions/add')
                .send(newAttraction)
                .expect(400);

            expect(response.body.msg).toBe('Attraction already saved');
        });
    });

    describe('DELETE /api/destinations/attractions/remove/:id', () => {
        test('should remove an attraction', async () => {
            const attractionId = '507f1f77bcf86cd799439011';
            mockUser.savedAttractions = [
                {
                    _id: { toString: () => attractionId },
                    attractionId: 'eiffel-tower',
                    name: 'Eiffel Tower'
                },
                {
                    _id: { toString: () => '507f1f77bcf86cd799439012' },
                    attractionId: 'louvre-museum',
                    name: 'Louvre Museum'
                }
            ];

            User.findById = jest.fn().mockResolvedValue(mockUser);

            const response = await request(app)
                .delete(`/api/destinations/attractions/remove/${attractionId}`)
                .expect(200);

            expect(mockUser.savedAttractions).toHaveLength(1);
            expect(mockUser.savedAttractions[0].name).toBe('Louvre Museum');
            expect(mockUser.save).toHaveBeenCalled();
        });
    });
});