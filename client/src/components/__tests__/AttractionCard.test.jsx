// __tests__/AttractionCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AttractionCard from '../AttractionCard';

const mockAttraction = {
    id: '1',
    name: 'Beautiful Lake',
    description: 'A beautiful lake surrounded by mountains.',
    image: 'lake.jpg',
    rating: 4,
};

const cityName = 'Test City';

describe('AttractionCard', () => {
    it('renders attraction details correctly', () => {
        render(
            <AttractionCard
                attraction={mockAttraction}
                cityName={cityName}
                savedAttractions={[]}
                onAdd={jest.fn()}
            />
        );

        // Only match the heading
        expect(screen.getByRole('heading', { name: /Beautiful Lake/i })).toBeInTheDocument();

        // Match the paragraph description
        expect(screen.getByText(/A beautiful lake/i)).toBeInTheDocument();

        // Check image
        expect(screen.getByRole('img')).toHaveAttribute('src', 'lake.jpg');

        // Check the add button
        expect(screen.getByText(/Add to Trip/i)).toBeInTheDocument();
    });


    it('calls onAdd when "Add to Trip" is clicked', () => {
        const handleAdd = jest.fn();

        render(
            <AttractionCard
                attraction={mockAttraction}
                cityName={cityName}
                savedAttractions={[]}
                onAdd={handleAdd}
            />
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleAdd).toHaveBeenCalledWith(mockAttraction, cityName);
    });

    it('disables button and shows "Saved" if already saved', () => {
        render(
            <AttractionCard
                attraction={mockAttraction}
                cityName={cityName}
                savedAttractions={[{ attractionId: '1' }]}
                onAdd={jest.fn()}
            />
        );

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button.textContent).toBe('Saved');
    });
});
