import React from 'react';
import { render, screen } from '@testing-library/react';
import TravelPlanner from '../travel-planner';
import { useNavigate } from 'react-router';

// Mock react-router
jest.mock('react-router', () => ({
    useNavigate: jest.fn(() => jest.fn()),
}));

describe('TravelPlanner Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        );
        localStorage.clear();
    });

    test('renders TravelPlanner title when token exists', () => {
        localStorage.setItem('token', 'mock-token');
        render(<TravelPlanner />);

        // Use role-based query to avoid duplicate text error
        expect(screen.getByRole('heading', { name: /Travel Planner/i })).toBeInTheDocument();
    });

    test('redirects when no token is present', () => {
        delete window.location;
        window.location = { href: '' };

        render(<TravelPlanner />);
        expect(window.location.href).toBe('/auth');
    });
});
