import React, { useState, useEffect } from 'react';
import './style.css';

const TravelPlanner = () => {
    const [trip, setTrip] = useState('');
    const [token, setToken] = useState(null);
    const [savedPlaces, setSavedPlaces] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setSavedPlaces(["Eiffel Tower", "Colosseum", "Mount Fuji"]); // Simulated saved places
        } else {
            // If not logged in, redirect to login/register page
            window.location.href = "/auth";
        }
    }, []);

    const handleAddTrip = (e) => {
        e.preventDefault();
        if (trip.trim()) {
            console.log(`Trip added: ${trip}`);
            setTrip('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setSavedPlaces([]);
        window.location.href = "/auth";
    };

    return (
        <div>
            <header className="header">
                <h1>Travel Planner</h1>
                <p>Plan and organize your travel destinations easily</p>
                <div className="user-menu">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>☰</button>
                    {dropdownOpen && (
                        <div className="dropdown">
                            <button onClick={handleLogout}>Logout</button>
                            <div className="saved-places">
                                <strong>Saved Places:</strong>
                                <ul>
                                    {savedPlaces.map((place, index) => (
                                        <li key={index}>{place}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <main>
                <section className="search">
                    <h2>Search Destination</h2>
                    <input type="text" placeholder="Search for a city, country, or destination..." />
                    <button>Search</button>
                </section>

                <section className="destinations">
                    <h2>Top Destinations</h2>
                    <div className="destination-grid">
                        {[
                            { href: 'paris.html', img: 'images/paris.jpg', title: 'Paris, France' },
                            { href: 'rome.html', img: 'images/rome.jpg', title: 'Rome, Italy' },
                            { href: 'bali.html', img: 'images/bali.jpg', title: 'Bali, Indonesia' },
                            { href: 'newyork.html', img: 'images/newyork.jpg', title: 'New York, USA' },
                            { href: 'tokyo.html', img: 'images/tokyo.jpg', title: 'Tokyo, Japan' },
                            { href: 'santorini.html', img: 'images/santorini.jpg', title: 'Santorini, Greece' },
                            { href: 'barcelona.html', img: 'images/barcelona.jpg', title: 'Barcelona, Spain' },
                            { href: 'dubai.html', img: 'images/dubai.jpg', title: 'Dubai, UAE' },
                            { href: 'capetown.html', img: 'images/capetown.jpg', title: 'Cape Town, South Africa' },
                            { href: 'sydney.html', img: 'images/sydney.jpg', title: 'Sydney, Australia' },
                        ].map(({ href, img, title }) => (
                            <a href={href} className="card" key={title}>
                                <img src={img} alt={title} />
                                <h3>{title}</h3>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="add trips">
                    <form onSubmit={handleAddTrip}>
                        <input
                            type="text"
                            placeholder="Destination name"
                            value={trip}
                            onChange={(e) => setTrip(e.target.value)}
                            required
                        />
                        <button type="submit">Add Trip</button>
                    </form>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 Travel Planner. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TravelPlanner;
