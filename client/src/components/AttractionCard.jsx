import React from 'react';

const AttractionCard = ({ attraction }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
                <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex-grow">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{attraction.name}</h3>
                    <div className="flex items-center bg-amber-100 px-2 py-1 rounded text-amber-800 text-sm">
                        <span className="font-bold">{attraction.rating}</span>
                        <span className="ml-1">★</span>
                    </div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{attraction.description}</p>
            </div>
        </div>
    );
};

export default AttractionCard;
