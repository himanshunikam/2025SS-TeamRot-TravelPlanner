import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CityPage from '../CityPage';
import { useParams } from 'react-router';

// 🧠 Use actual data from cities.js & attractions.js
import { cities } from '../cities';
import { attractions } from '../attractions';

// 🔧 Mocks for react-router and components
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

jest.mock('../AttractionCard', () => ({ attraction }) => (
    <div data-testid="attraction-card">{attraction.name}</div>
));

describe('CityPage', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'dummy-token');
        useParams.mockReturnValue({ cityId: 'paris' });

        global.fetch = jest.fn((url) => {
            if (url.includes('/saved')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([]),
                });
            }
            if (url.includes('/add')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([]),
                });
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('renders Paris city page with attractions', async () => {
        render(<CityPage />);

        // Spinner should disappear
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });

        const paris = cities.find(c => c.id === 'paris');
        const parisAttractions = attractions.filter(a => a.cityId === 'paris');

        expect(screen.getByText(paris.name)).toBeInTheDocument();
        expect(screen.getByText(paris.description)).toBeInTheDocument();
        expect(screen.getByText(`Top Attractions in ${paris.name}`)).toBeInTheDocument();

        const renderedAttractions = screen.getAllByTestId('attraction-card');
        expect(renderedAttractions).toHaveLength(parisAttractions.length);
        parisAttractions.forEach(a => {
            expect(screen.getByText(a.name)).toBeInTheDocument();
        });
    });
});
