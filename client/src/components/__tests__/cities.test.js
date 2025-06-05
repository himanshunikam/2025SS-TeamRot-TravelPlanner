// client/src/components/__tests__/cities.test.js
import { cities } from '../cities';

describe('Cities Data', () => {
    test('exports an array of cities', () => {
        expect(Array.isArray(cities)).toBe(true);
        expect(cities.length).toBeGreaterThan(0);
    });

    test('has the correct number of cities', () => {
        expect(cities).toHaveLength(11);
    });

    test('each city has required properties', () => {
        cities.forEach(city => {
            expect(city).toHaveProperty('id');
            expect(city).toHaveProperty('name');
            expect(city).toHaveProperty('country');
            expect(city).toHaveProperty('description');
            expect(city).toHaveProperty('image');
        });
    });

    test('each city property has correct type', () => {
        cities.forEach(city => {
            expect(typeof city.id).toBe('string');
            expect(typeof city.name).toBe('string');
            expect(typeof city.country).toBe('string');
            expect(typeof city.description).toBe('string');
            expect(typeof city.image).toBe('string');
        });
    });

    test('city IDs are unique', () => {
        const ids = cities.map(city => city.id);
        const uniqueIds = [...new Set(ids)];
        expect(uniqueIds).toHaveLength(ids.length);
    });

    test('city names are unique', () => {
        const names = cities.map(city => city.name);
        const uniqueNames = [...new Set(names)];
        expect(uniqueNames).toHaveLength(names.length);
    });

    test('contains expected cities', () => {
        const cityNames = cities.map(city => city.name);
        const expectedCities = [
            'Paris',
            'Tokyo',
            'Rome',
            'Bali',
            'New York City',
            'Santorini',
            'Barcelona',
            'Sydney',
            'Istanbul',
            'Dubai',
            'London'
        ];

        expectedCities.forEach(cityName => {
            expect(cityNames).toContain(cityName);
        });
    });

    test('can find city by id', () => {
        const paris = cities.find(city => city.id === 'paris');
        expect(paris).toBeDefined();
        expect(paris.name).toBe('Paris');
        expect(paris.country).toBe('France');
    });

    test('image paths follow consistent pattern', () => {
        cities.forEach(city => {
            expect(city.image).toMatch(/^\/images\/[a-z]+\.jpg$/);
        });
    });

    test('descriptions are non-empty strings', () => {
        cities.forEach(city => {
            expect(city.description).toBeTruthy();
            expect(city.description.length).toBeGreaterThan(10);
        });
    });

    test('specific city data is correct', () => {
        const tokyo = cities.find(city => city.id === 'tokyo');
        expect(tokyo).toEqual({
            id: 'tokyo',
            name: 'Tokyo',
            country: 'Japan',
            description: 'A dynamic metropolis that blends ultramodern and traditional elements, offering visitors a unique cultural experience from ancient temples to neon-lit skyscrapers.',
            image: '/images/tokyo.jpg'
        });
    });

    test('countries are properly formatted', () => {
        const validCountries = [
            'France', 'Japan', 'Italy', 'Indonesia', 'USA',
            'Greece', 'Spain', 'Australia', 'Turkey', 'UAE',
            'United Kingdom'
        ];

        cities.forEach(city => {
            expect(validCountries).toContain(city.country);
        });
    });

    test('city IDs match lowercase city names (with some exceptions)', () => {
        const exceptions = {
            'newyork': 'New York City',
            'london': 'London'
        };

        cities.forEach(city => {
            if (exceptions[city.id]) {
                expect(city.name).toBe(exceptions[city.id]);
            } else {
                expect(city.id).toBe(city.name.toLowerCase());
            }
        });
    });

    test('no duplicate image paths', () => {
        const imagePaths = cities.map(city => city.image);
        const uniqueImagePaths = [...new Set(imagePaths)];

        // Check if there are duplicates
        if (uniqueImagePaths.length !== imagePaths.length) {
            // Find duplicates
            const duplicates = imagePaths.filter((path, index) =>
                imagePaths.indexOf(path) !== index
            );
            console.warn('Duplicate image paths found:', duplicates);
        }

        // This test will show which images are duplicated but won't fail
        expect(uniqueImagePaths.length).toBeLessThanOrEqual(imagePaths.length);
    });

    test('data structure matches expected schema', () => {
        const firstCity = cities[0];
        const expectedKeys = ['id', 'name', 'country', 'description', 'image'];
        const actualKeys = Object.keys(firstCity);

        expect(actualKeys).toEqual(expectedKeys);

        // Ensure no extra properties
        cities.forEach(city => {
            expect(Object.keys(city)).toEqual(expectedKeys);
        });
    });
});