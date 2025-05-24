import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TravelPlanner = () => {
    const [trip, setTrip] = useState('');
    const [token, setToken] = useState(null);
    const [savedPlaces, setSavedPlaces] = useState([]);
    const [savedAttractions, setSavedAttractions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('destinations');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            fetchSavedDestinations(storedToken);
            fetchSavedAttractions(storedToken);
        } else {
            window.location.href = "/auth";
        }
    }, []);

    const fetchSavedDestinations = async (authToken) => {
        try {
            const response = await fetch('http://localhost:5000/api/destinations/saved', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

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

    const fetchSavedAttractions = async (authToken) => {
        try {
            const response = await fetch('http://localhost:5000/api/destinations/attractions/saved', {
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

    const handleAddTrip = async () => {
        setError('');

        if (trip.trim()) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/destinations/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name: trip })
                });

                const data = await response.json();

                if (response.ok) {
                    setSavedPlaces(data);
                    setTrip('');
                } else {
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

    const handleRemoveDestination = async (destinationId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/destinations/remove/${destinationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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

    const handleRemoveAttraction = async (attractionId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/destinations/attractions/remove/${attractionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setSavedPlaces([]);
        setSavedAttractions([]);
        window.location.href = "/auth";
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTrip();
        }
    };

    const handleCityClick = (cityId) => {
        navigate(`/city/${cityId}`);
    };

    return (
        <div className="travel-planner">
            <header className="header">
                <h1>Travel Planner</h1>
                <p>Plan and organize your travel destinations easily</p>
                <div className="user-menu">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="menu-button"
                    >
                        ☰
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown">
                            <button onClick={handleLogout} className="logout-button">
                                Logout
                            </button>
                            <div className="saved-places">
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

            <main>
                <section className="search">
                    <h2>Search Destination</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for a city, country, or destination..."
                            className="search-input"
                        />
                        <button className="search-button">Search</button>
                    </div>
                </section>

                <section className="destinations">
                    <h2>Top Destinations</h2>
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
                            { id: 'london', img: '/images/london.jpg', title: 'London, United Kingdom' },
                            { id: 'sydney', img: '/images/sydney.jpg', title: 'Sydney, Australia' },
                        ].map(({ id, img, title }) => (
                            <div
                                className="card"
                                key={id}
                                onClick={() => handleCityClick(id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={img} alt={title} />
                                <h3>{title}</h3>
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
                        />
                        <button
                            onClick={handleAddTrip}
                            disabled={loading || !trip.trim()}
                            className="add-trip-button"
                        >
                            {loading ? 'Adding...' : 'Add Trip'}
                        </button>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 Travel Planner. All rights reserved.</p>
            </footer>

            <style jsx>{`
                .travel-planner {
                    font-family: Arial, sans-serif;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .header {
                    background-color: #2c3e50;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    position: relative;
                }

                .user-menu {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }

                .menu-button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px 10px;
                }

                .dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    color: black;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    min-width: 300px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 1000;
                }

                .logout-button {
                    width: 100%;
                    padding: 10px;
                    background-color: #e74c3c;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-bottom: 10px;
                }

                .logout-button:hover {
                    background-color: #c0392b;
                }

                .tabs {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 10px;
                }

                .tab-button {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ddd;
                    background: #f8f9fa;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: all 0.3s;
                }

                .tab-button.active {
                    background: #3498db;
                    color: white;
                    border-color: #3498db;
                }

                .tab-button:hover:not(.active) {
                    background: #e9ecef;
                }

                .saved-places {
                    margin-top: 10px;
                }

                .saved-places ul {
                    list-style: none;
                    padding: 0;
                    margin: 5px 0;
                    max-height: 300px;
                    overflow-y: auto;
                }

                .saved-place-item, .saved-attraction-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                }

                .attraction-info {
                    display: flex;
                    flex-direction: column;
                }

                .attraction-name {
                    font-weight: 500;
                }

                .city-name {
                    font-size: 12px;
                    color: #666;
                }

                .remove-button {
                    background: none;
                    border: none;
                    color: #e74c3c;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0 5px;
                }

                .remove-button:hover {
                    color: #c0392b;
                }

                .no-places {
                    color: #666;
                    font-style: italic;
                    margin: 10px 0;
                }

                main {
                    flex: 1;
                    padding: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                }

                section {
                    margin-bottom: 40px;
                }

                h2 {
                    color: #2c3e50;
                    margin-bottom: 20px;
                }

                .search-container {
                    display: flex;
                    gap: 10px;
                }

                .search-input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }

                .search-button {
                    padding: 10px 20px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .search-button:hover {
                    background-color: #2980b9;
                }

                .destination-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 20px;
                }

                .card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s;
                    cursor: pointer;
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .card img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }

                .card h3 {
                    padding: 15px;
                    margin: 0;
                    color: #2c3e50;
                }

                .quick-add-button {
                    width: 100%;
                    padding: 10px;
                    background-color: #27ae60;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                }

                .quick-add-button:hover {
                    background-color: #229954;
                }

                .add-trips {
                    background-color: #f8f9fa;
                    padding: 30px;
                    border-radius: 8px;
                }

                .error-message {
                    color: #e74c3c;
                    margin-bottom: 10px;
                }

                .add-trip-container {
                    display: flex;
                    gap: 10px;
                }

                .add-trip-input {
                    flex: 1;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }

                .add-trip-button {
                    padding: 12px 24px;
                    background-color: #27ae60;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }

                .add-trip-button:hover:not(:disabled) {
                    background-color: #229954;
                }

                .add-trip-button:disabled {
                    background-color: #95a5a6;
                    cursor: not-allowed;
                }

                footer {
                    background-color: #34495e;
                    color: white;
                    text-align: center;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
};

export default TravelPlanner;