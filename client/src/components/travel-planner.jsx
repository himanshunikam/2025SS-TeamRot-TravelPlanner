import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './style.css';

// Main component for planning trips, managing saved destinations and attractions
const TravelPlanner = () => {
    // State for new trip input
    const [trip, setTrip] = useState('');
    // JWT token for authenticated API calls
    const [token, setToken] = useState(null);
    // Lists of saved destinations and attractions
    const [savedPlaces, setSavedPlaces] = useState([]);
    const [savedAttractions, setSavedAttractions] = useState([]);
    // Controls visibility of user dropdown menu
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // Loading and error states for add-destination action
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Which tab is active in saved-items dropdown: 'destinations' or 'attractions'
    const [activeTab, setActiveTab] = useState('destinations');
    // Navigation hook for routing to city pages
    const navigate = useNavigate();

    // On mount, check localStorage for token and fetch saved items
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchSavedDestinations(storedToken);
            fetchSavedAttractions(storedToken);
        } else {
            // Redirect to auth if no token found
            window.location.href = '/auth';
        }
    }, []);

    // Fetch saved destinations from backend
    const fetchSavedDestinations = async (authToken) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}:5000/api/destinations/saved`,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setSavedPlaces(data);
            } else {
                console.error('Failed to fetch saved destinations');
            }
        } catch (err) {
            console.error('Error fetching saved destinations:', err);
        }
    };

    // Fetch saved attractions from backend
    const fetchSavedAttractions = async (authToken) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}:5000/api/destinations/attractions/saved`,
                { headers: { Authorization: `Bearer ${authToken}` } }
            );
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

    // Add a new trip (destination) via API
    const handleAddTrip = async () => {
        setError('');
        if (trip.trim()) {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}:5000/api/destinations/add`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ name: trip })
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    // Update saved destinations and clear input
                    setSavedPlaces(data);
                    setTrip('');
                } else {
                    // Show API error message
                    setError(data.msg || 'Failed to add destination');
                }
            } catch (err) {
                setError('Error adding destination');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Remove a destination by ID
    const handleRemoveDestination = async (destinationId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}:5000/api/destinations/remove/${destinationId}`,
                { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setSavedPlaces(data);
            } else {
                console.error('Failed to remove destination');
            }
        } catch (err) {
            console.error('Error removing destination:', err);
        }
    };

    // Remove an attraction by its subdocument ID
    const handleRemoveAttraction = async (attractionId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}:5000/api/destinations/attractions/remove/${attractionId}`,
                { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setSavedAttractions(data);
            } else {
                console.error('Failed to remove attraction');
            }
        } catch (err) {
            console.error('Error removing attraction:', err);
        }
    };

    // Clear auth token and redirect to login
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setSavedPlaces([]);
        setSavedAttractions([]);
        window.location.href = '/auth';
    };

    // Trigger add when pressing Enter in input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTrip();
        }
    };

    // Navigate to a city-specific page on card click
    const handleCityClick = (cityId) => {
        navigate(`/city/${cityId}`);
    };

    return (
        <div className="travel-planner">
            {/* Header with title and user menu */}
            <header className="header">
                <h1>Travel Planner</h1>
                <p>Plan and organize your travel destinations easily</p>
                <div className="user-menu">
                    {/* Menu toggle button */}
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="menu-button">
                        ☰
                    </button>

                    {/* Dropdown showing logout and saved items */}
                    {dropdownOpen && (
                        <div className="dropdown">
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                            <div className="saved-places">
                                {/* Tabs for destinations vs attractions */}
                                <div className="tabs">
                                    <button
                                        onClick={() => setActiveTab('destinations')}
                                        className={`tab-button ${activeTab === 'destinations' ? 'active' : ''}`}
                                    >
                                        Destinations ({savedPlaces.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('attractions')}
                                        className={`tab-button ${activeTab === 'attractions' ? 'active' : ''}`}
                                    >
                                        Attractions ({savedAttractions.length})
                                    </button>
                                </div>

                                {/* Conditionally render saved destinations or attractions */}
                                {activeTab === 'destinations' ? (
                                    <>
                                        <strong>Saved Destinations:</strong>
                                        {savedPlaces.length === 0 ? (
                                            <p className="no-places">No saved destinations yet</p>
                                        ) : (
                                            <ul>
                                                {savedPlaces.map((place) => (
                                                    <li key={place._id} className="saved-place-item">
                                                        <span>{place.name}</span>
                                                        <button
                                                            onClick={() => handleRemoveDestination(place._id)}
                                                            className="remove-button"
                                                            title="Remove destination"
                                                        >
                                                            ×
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <strong>Saved Attractions:</strong>
                                        {savedAttractions.length === 0 ? (
                                            <p className="no-places">No saved attractions yet</p>
                                        ) : (
                                            <ul>
                                                {savedAttractions.map((attr) => (
                                                    <li key={attr._id} className="saved-attraction-item">
                                                        <div className="attraction-info">
                                                            <span className="attraction-name">{attr.name}</span>
                                                            <span className="city-name">{attr.cityName}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveAttraction(attr._id)}
                                                            className="remove-button"
                                                            title="Remove attraction"
                                                        >
                                                            ×
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main section for adding and viewing top destinations */}
            <main>
                <section className="add-trips">
                    <h2>Add Destination to Your List</h2>
                    {error && <p className="error-message">{error}</p>}
                    <div className="add-trip-container">
                        <input
                            type="text"
                            placeholder="Destination name"
                            value={trip}
                            onChange={(e) => setTrip(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="add-trip-input"
                            required
                            style={{ height: '50px', boxSizing: 'border-box' , transform: 'translateY(8px)'}}
                        />
                        <button onClick={handleAddTrip} disabled={loading || !trip.trim()} className="add-trip-button"
                                style={{
                                    transform: 'translateY(-30px)',
                                    transition: 'background-color 0.3s, transform 0.3s'
                                }}>
                            {loading ? 'Adding...' : 'Add Trip'}
                        </button>
                    </div>
                </section>

                <section className="destinations">
                    <h2>Top Destinations</h2>
                    {/* Grid of preset destination cards for quick add or navigation */}
                    <div className="destination-grid">
                        {[
                            { id: 'paris', img: '/images/paris.jpg', title: 'Paris, France' },
                            { id: 'rome', img: '/images/rome.jpg', title: 'Rome, Italy' },
                            { id: 'bali', img: '/images/bali.jpg', title: 'Bali, Indonesia' },
                            { id: 'newyork', img: '/images/newyork.jpg', title: 'New York, USA' },
                            { id: 'tokyo', img: '/images/tokyo.jpg', title: 'Tokyo, Japan' },
                            { id: 'santorini', img: '/images/santorini.jpg', title: 'Santorini, Greece' },
                            { id: 'barcelona', img: '/images/barcelona.jpg', title: 'Barcelona, Spain' },
                            { id: 'dubai', img: '/images/dubai.jpg', title: 'Dubai, UAE' },
                            { id: 'istanbul', img: '/images/istanbul.jpg', title: 'Istanbul, Turkey' },
                            { id: 'london', img: '/images/london.jpg', title: 'London, United Kingdom' },
                            { id: 'sydney', img: '/images/sydney.jpg', title: 'Sydney, Australia' },
                            { id: 'singapore', img: '/images/singapore.jpg', title: 'Singapore, Singapore' },
                        ].map(({ id, img, title }) => (
                            <div
                                className="card"
                                key={id}
                                onClick={() => handleCityClick(id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={img} alt={title} />
                                <h3>{title}</h3>
                                {/* Quick-add places typed based on card selection */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setTrip(title);
                                        document.querySelector('.add-trip-input')?.focus();
                                    }}
                                    className="quick-add-button"
                                >
                                    Quick Add
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer with copyright */}
            <footer>
                <p>&copy; 2025 BCN: Team Rot</p>
            </footer>
        </div>
    );
};

export default TravelPlanner;
