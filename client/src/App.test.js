// client/src/App.test.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('basic test works', () => {
    render(<div>Hello Test</div>);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
});