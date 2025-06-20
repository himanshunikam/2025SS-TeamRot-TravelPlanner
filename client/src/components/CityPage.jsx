import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { cities } from './cities';
import { attractions } from './attractions';
import AttractionCard from '../components/AttractionCard';

const CityPage = () => {
    const { cityId } = useParams();
    const [city, setCity] = useState(null);
    const [cityAttractions, setCityAttractions] = useState([]);
    const [savedAttractions, setSavedAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Get token from localStorage
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            window.location.href = "/auth";
            return;
        }
        setToken(storedToken);

        // Find city by ID
        const selectedCity = cities.find(c => c.id === cityId) || null;
        setCity(selectedCity);

        if (selectedCity) {
            const filteredAttractions = attractions.filter(a => a.cityId === cityId);
            setCityAttractions(filteredAttractions);
        }

        // Fetch saved attractions
        fetchSavedAttractions(storedToken);

        setLoading(false);
    }, [cityId]);

    const fetchSavedAttractions = async (authToken) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}:5000/api/destinations/attractions/saved`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSavedAttractions(data);
            } else {
                console.error('Failed to fetch saved attractions');
            }
        } catch (err) {
            console.error('Error fetching saved attractions:', err);
        }
    };

    const handleAddAttraction = async (attraction, cityName) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}:5000/api/destinations/attractions/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    attractionId: attraction.id,
                    name: attraction.name,
                    cityId: attraction.cityId,
                    cityName: cityName,
                    image: attraction.image
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSavedAttractions(data);
                // Show success notification (optional)
                console.log('Attraction added successfully');
            } else {
                throw new Error(data.msg || 'Failed to add attraction');
            }
        } catch (err) {
            console.error('Error adding attraction:', err);
            throw err;
        }
    };

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
                className="relative h-[60vh] bg-cover bg-center"
                style={{ backgroundColor: '#2c3e50' }}
            >
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white">
                    <Link to="/cities" className="inline-flex items-center mb-6 hover:underline self-start text-white" style={{color : 'white'}} >
                        <ArrowLeft className="mr-2 h-5 w-5" style={{color : 'white'}} />
                        Back to all cities
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-bold mb-2" style={{color : 'white' , textAlign: 'center'}}>{city.name}</h1>
                    <div className="flex items-center text-lg" style={{color : 'white', textAlign: 'center'}}>
                        <div>
                            {city.country}
                        </div>

                    </div>
                </div>

            </div>



{/* City Description */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-md p-6 mb-12">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">About {city.name}</h2>
                    <p className="text-gray-700">{city.description}</p>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Best time to visit</h3>
                        <div className="flex items-start space-x-2">
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
                <div className="destination-grid">
                    {cityAttractions.length > 0 ? (
                        cityAttractions.map(attraction => (
                            <AttractionCard
                                key={attraction.id}
                                attraction={attraction}
                                cityName={city.name}
                                savedAttractions={savedAttractions}
                                onAdd={handleAddAttraction}
                            />
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