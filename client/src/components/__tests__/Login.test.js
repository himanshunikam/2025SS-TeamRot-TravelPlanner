// client/src/components/__tests__/Login.simple.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MockLogin from '../MockLogin';

// Tests
describe('Login Component Basic Tests', () => {
    const mockSetLoggedInUser = jest.fn();

    beforeEach(() => {
        mockSetLoggedInUser.mockClear();
        localStorage.clear();
    });

    test('renders all form elements', () => {
        render(<MockLogin setLoggedInUser={mockSetLoggedInUser} />);

        expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    test('can type in input fields', () => {
        render(<MockLogin setLoggedInUser={mockSetLoggedInUser} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'myusername' } });
        fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

        expect(usernameInput.value).toBe('myusername');
        expect(passwordInput.value).toBe('mypassword');
    });

    test('shows success message on correct credentials', () => {
        render(<MockLogin setLoggedInUser={mockSetLoggedInUser} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpass' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Logged in successfully')).toBeInTheDocument();
        expect(mockSetLoggedInUser).toHaveBeenCalledWith('testuser');
    });

    test('shows error message on wrong credentials', () => {
        render(<MockLogin setLoggedInUser={mockSetLoggedInUser} />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Failed to login - wrong credentials')).toBeInTheDocument();
        expect(mockSetLoggedInUser).not.toHaveBeenCalled();
    });
});