// client/src/setupTests.js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Mock window.location
delete window.location;
window.location = { href: jest.fn() };
// jest.setup.js

const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;

global.TextDecoder = TextDecoder;

// Suppress console errors during tests (optional)
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: ReactDOM.render is no longer supported')
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
