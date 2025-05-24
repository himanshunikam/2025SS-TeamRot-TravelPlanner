import React, { useState, useEffect } from 'react';
import { Plus, Check, Loader2 } from 'lucide-react';

const AttractionCard = ({ attraction, cityName, savedAttractions, onAdd }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const saved = savedAttractions?.some(
            saved => saved.attractionId === attraction.id
        );
        setIsSaved(saved);
    }, [savedAttractions, attraction.id]);

    const handleAdd = async () => {
        if (isSaved || isAdding) return;

        setIsAdding(true);
        try {
            await onAdd(attraction, cityName);
            setIsSaved(true);
        } catch (error) {
            console.error('Error adding attraction:', error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden relative">
                <img
                    width={400}
                    height={400}
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handleAdd}
                    disabled={isSaved || isAdding}
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all duration-300 ${
                        isSaved
                            ? 'bg-green-500 text-white cursor-default'
                            : isAdding
                                ? 'bg-gray-400 text-white cursor-wait'
                                : 'bg-white text-gray-700 hover:bg-teal-500 hover:text-white cursor-pointer'
                    }`}
                    title={isSaved ? 'Already saved' : 'Add to saved attractions'}
                >
                    {isAdding ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : isSaved ? (
                        <Check className="h-5 w-5" />
                    ) : (
                        <Plus className="h-5 w-5" />
                    )}
                </button>
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
