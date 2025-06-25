import React, { useState, useEffect } from 'react';
// Diese Teil erstellt Attractions card und zeigt einen Bild, Name der Attraction, Bewertung, eine kleine Beschreiebung
// und einen Button, um die Attraction zu einer gespeicherten Liste Trip einzufügen

// hier werden die Komponenten für die Attractions card erstellung definiert
const AttractionCard = ({ attraction, cityName, savedAttractions, onAdd }) => {
    const [isAdding, setIsAdding] = useState(false);// die konstanten zum Hinzufügen und ihre State verwaltung
    const [isSaved, setIsSaved] = useState(false);
    // Prüft, ob die Attraction gespeichert ist
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
    // Visualisiert die Sterne Bewertung
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                </span>
            );
        }
        return stars;
    };
    // hier wird die Attraktionskarte zurückgegeben
    return (
        <div
            className="card cursor-pointer"
            style={{
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
            }}
        >
            <img
                src={attraction.image}
                alt={attraction.name}
                style={{ width: '100%', height: '180px', objectFit: 'contain' }}
            />
            <div style={{ padding: '12px' }}>
                <h3 className="text-lg font-semibold mb-1">{attraction.name}</h3>

                {/* Ratings */}
                <div className="mb-2 text-sm">{renderStars(attraction.rating || 0)}</div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-4">
                    {attraction.description}
                </p>

                {/* Add/Save Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAdd(attraction, cityName);
                    }}
                    disabled={isSaved}
                    className={`quick-add-button py-1 px-3 rounded text-sm ${
                        isSaved
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                    }`}
                >
                    {isSaved ? 'Saved' : 'Add to Trip'}
                </button>
            </div>
        </div>
    );
};

export default AttractionCard;
