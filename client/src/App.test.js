import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

// Mock components to test routing behavior
jest.mock('./components/Login', () => () => <div>Login Component</div>);
jest.mock('./components/Register', () => () => <div>Register Component</div>);
jest.mock('./components/travel-planner', () => () => <div>TravelPlanner Component</div>);
jest.mock('./components/CityPage', () => () => <div>CityPage Component</div>);

describe('App Component', () => {
    afterEach(() => {
        localStorage.clear();
    });

    test('shows login when not authenticated', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );

        // Wait for login screen to appear
        await waitFor(() => {
            expect(screen.getByText(/login component/i)).toBeInTheDocument();
        });
    });

    test('redirects to travel when token exists', async () => {
        localStorage.setItem('token', '123');
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );

        // Wait for travel planner to appear
        await waitFor(() => {
            expect(screen.getByText(/travelplanner component/i)).toBeInTheDocument();
        });
    });
});
