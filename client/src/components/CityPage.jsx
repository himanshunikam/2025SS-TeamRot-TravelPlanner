import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { cities } from '../components/cities';
import { attractions } from '../components/attractions';
import AttractionCard from '../components/AttractionCard';

const CityPage = () => {
    const { cityId } = useParams();  // Get cityId from the URL
    const [city, setCity] = useState(null);  // City details
    const [cityAttractions, setCityAttractions] = useState([]);  // Attractions for the city
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        // Simulate API call or data fetching
        const selectedCity = cities.find(c => c.id === cityId) || null; // Find city by ID
        setCity(selectedCity);

        if (selectedCity) {
            const filteredAttractions = attractions.filter(a => a.cityId === cityId);  // Filter attractions for the city
            setCityAttractions(filteredAttractions);
        }

        setLoading(false);  // Stop loading once data is fetched
    }, [cityId]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (!city) {
        return (
            <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">City Not Found</h1>
                <p className="text-gray-600 mb-6">The city you're looking for doesn't exist.</p>
                <Link to="/cities" className="text-teal-600 hover:text-teal-800 font-medium flex items-center">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to all cities
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div
                className="relative h-[50vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${city.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                    <Link to="/cities" className="inline-flex items-center text-white mb-6 hover:underline">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to all cities
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{city.name}</h1>
                    <div className="flex items-center text-white text-lg mb-4">
                        <MapPin className="h-5 w-5 mr-1" />
                        <span>{city.country}</span>
                    </div>
                </div>
            </div>

            {/* City Description */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-md p-6 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About {city.name}</h2>
                    <p className="text-gray-700">{city.description}</p>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Best time to visit</h3>
                        <div className="flex items-start space-x-2">
                            <Calendar className="h-5 w-5 text-teal-600 mt-0.5" />
                            <div>
                                <p className="text-gray-700">
                                    The best time to visit {city.name} varies depending on your preferences.
                                    Check local weather patterns and events before planning your trip.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attractions */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Attractions in {city.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {cityAttractions.length > 0 ? (
                        cityAttractions.map(attraction => (
                            <AttractionCard key={attraction.id} attraction={attraction} />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full">No attractions found for this city.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CityPage;
