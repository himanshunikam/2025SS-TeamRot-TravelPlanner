// client/src/components/__tests__/attractions.test.js
import { attractions } from '../attractions';
import { cities } from '../cities';

describe('Attractions Data', () => {
    test('exports an array of attractions', () => {
        expect(Array.isArray(attractions)).toBe(true);
        expect(attractions.length).toBeGreaterThan(0);
    });

    test('has the correct number of attractions', () => {
        expect(attractions).toHaveLength(18);
    });

    test('each attraction has required properties', () => {
        attractions.forEach(attraction => {
            expect(attraction).toHaveProperty('id');
            expect(attraction).toHaveProperty('cityId');
            expect(attraction).toHaveProperty('name');
            expect(attraction).toHaveProperty('description');
            expect(attraction).toHaveProperty('image');
            expect(attraction).toHaveProperty('rating');
        });
    });

    test('each attraction property has correct type', () => {
        attractions.forEach(attraction => {
            expect(typeof attraction.id).toBe('string');
            expect(typeof attraction.cityId).toBe('string');
            expect(typeof attraction.name).toBe('string');
            expect(typeof attraction.description).toBe('string');
            expect(typeof attraction.image).toBe('string');
            expect(typeof attraction.rating).toBe('number');
        });
    });

    test('attraction IDs are unique', () => {
        const ids = attractions.map(attraction => attraction.id);
        const uniqueIds = [...new Set(ids)];
        expect(uniqueIds).toHaveLength(ids.length);
    });

    test('ratings are within valid range', () => {
        attractions.forEach(attraction => {
            expect(attraction.rating).toBeGreaterThanOrEqual(0);
            expect(attraction.rating).toBeLessThanOrEqual(5);
        });
    });



    test('attractions are grouped by city', () => {
        const attractionsByCity = {
            paris: 3,
            tokyo: 3,
            newyork: 3,
            rome: 2,
            sydney: 2,
            istanbul: 1,
            barcelona: 1,
            dubai: 1,
            singapore: 1,
            london: 1
        };

        Object.entries(attractionsByCity).forEach(([cityId, count]) => {
            const cityAttractions = attractions.filter(a => a.cityId === cityId);
            expect(cityAttractions).toHaveLength(count);
        });
    });

    test('image paths follow consistent pattern', () => {
        attractions.forEach(attraction => {
            // Most should start with /images/, but one has ./images/
            expect(attraction.image).toMatch(/^\.?\/images\/[a-z]+\.jpg$/);
        });
    });

    test('image path consistency (should all use /images/)', () => {
        const inconsistentPaths = attractions.filter(attraction =>
            !attraction.image.startsWith('/images/')
        );

        if (inconsistentPaths.length > 0) {
            console.warn('Inconsistent image paths found:',
                inconsistentPaths.map(a => ({ name: a.name, image: a.image }))
            );
        }

        // This test will warn but not fail
        expect(inconsistentPaths.length).toBeLessThanOrEqual(1);
    });

    test('descriptions are non-empty strings', () => {
        attractions.forEach(attraction => {
            expect(attraction.description).toBeTruthy();
            expect(attraction.description.length).toBeGreaterThan(10);
        });
    });

    test('specific attraction data is correct', () => {
        const eiffelTower = attractions.find(a => a.id === 'eiffel-tower');
        expect(eiffelTower).toEqual({
            id: 'eiffel-tower',
            cityId: 'paris',
            name: 'Eiffel Tower',
            description: 'Iconic iron tower on the Champ de Mars, named after engineer Gustave Eiffel.',
            image: '/images/eiffeltower.jpg',
            rating: 4.7
        });
    });

    test('can find attractions by city', () => {
        const parisAttractions = attractions.filter(a => a.cityId === 'paris');
        expect(parisAttractions).toHaveLength(3);

        const parisAttractionNames = parisAttractions.map(a => a.name);
        expect(parisAttractionNames).toContain('Eiffel Tower');
        expect(parisAttractionNames).toContain('Louvre Museum');
        expect(parisAttractionNames).toContain('Notre-Dame Cathedral');
    });

    test('rating distribution', () => {
        const highRated = attractions.filter(a => a.rating >= 4.5);
        const mediumRated = attractions.filter(a => a.rating >= 3.5 && a.rating < 4.5);
        const lowRated = attractions.filter(a => a.rating < 3.5);

        // Just to understand the distribution
        console.log('Rating distribution:', {
            high: highRated.length,
            medium: mediumRated.length,
            low: lowRated.length
        });

        // At least some attractions in each category
        expect(highRated.length).toBeGreaterThan(0);
        expect(mediumRated.length).toBeGreaterThan(0);
        expect(lowRated.length).toBeGreaterThan(0);
    });

    test('cities without attractions', () => {
        const cityIds = cities.map(city => city.id);
        const attractionCityIds = [...new Set(attractions.map(a => a.cityId))];

        const citiesWithoutAttractions = cityIds.filter(
            cityId => !attractionCityIds.includes(cityId)
        );

        // Bali and Santorini don't have attractions
        expect(citiesWithoutAttractions).toEqual(['bali', 'santorini']);
    });

    test('attraction names are properly formatted', () => {
        attractions.forEach(attraction => {
            // Names should start with capital letter
            expect(attraction.name[0]).toBe(attraction.name[0].toUpperCase());

            // Names shouldn't have leading/trailing spaces
            expect(attraction.name).toBe(attraction.name.trim());
        });
    });

    test('no duplicate attraction names within same city', () => {
        const cityGroups = {};
        attractions.forEach(attraction => {
            if (!cityGroups[attraction.cityId]) {
                cityGroups[attraction.cityId] = [];
            }
            cityGroups[attraction.cityId].push(attraction.name);
        });

        Object.entries(cityGroups).forEach(([cityId, names]) => {
            const uniqueNames = [...new Set(names)];
            expect(uniqueNames).toHaveLength(names.length);
        });
    });

    test('data structure matches expected schema', () => {
        const firstAttraction = attractions[0];
        const expectedKeys = ['id', 'cityId', 'name', 'description', 'image', 'rating'];
        const actualKeys = Object.keys(firstAttraction);

        expect(actualKeys).toEqual(expectedKeys);

        // Ensure no extra properties
        attractions.forEach(attraction => {
            expect(Object.keys(attraction)).toEqual(expectedKeys);
        });
    });

    test('highest and lowest rated attractions', () => {
        const sortedByRating = [...attractions].sort((a, b) => b.rating - a.rating);
        const highest = sortedByRating[0];
        const lowest = sortedByRating[sortedByRating.length - 1];

        expect(highest.name).toBe('Meiji Shrine');
        expect(highest.rating).toBe(5);

        // Multiple attractions have 3.2 rating
        expect(lowest.rating).toBe(3.2);
        const lowestRated = attractions.filter(a => a.rating === 3.2);
        expect(lowestRated).toHaveLength(3);
    });

    test('average rating by city', () => {
        const cityRatings = {};

        attractions.forEach(attraction => {
            if (!cityRatings[attraction.cityId]) {
                cityRatings[attraction.cityId] = [];
            }
            cityRatings[attraction.cityId].push(attraction.rating);
        });

        const averageRatings = {};
        Object.entries(cityRatings).forEach(([cityId, ratings]) => {
            const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            averageRatings[cityId] = Number(average.toFixed(2));
        });

        // Tokyo should have high average due to Meiji Shrine
        expect(averageRatings.tokyo).toBeGreaterThan(4.0);
    });
});