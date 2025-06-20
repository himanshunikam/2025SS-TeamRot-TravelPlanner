// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Register from './components/Register';
import Login from './components/Login';
import TravelPlanner from "./components/travel-planner";
import CityPage from "./components/CityPage";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        // Check if user is already logged in on app load
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedInUser(true);
        }
        setCheckingAuth(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setLoggedInUser(null); // Set logged-in user to null
    };

    if (checkingAuth) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={
                    loggedInUser ? <Navigate to="/travel" /> : <Login setLoggedInUser={setLoggedInUser} />
                } />
                <Route path="/register" element={
                    loggedInUser ? <Navigate to="/travel" /> : <Register />
                } />

                {/* Protected routes */}
                <Route path="/travel" element={
                    loggedInUser ? <TravelPlanner /> : <Navigate to="/login" />
                } />
                <Route path="/city/:cityId" element={
                    loggedInUser ? <CityPage /> : <Navigate to="/login" />
                } />

                {/* Default route */}
                <Route path="*" element={<Navigate to={loggedInUser ? "/travel" : "/login"} />} />
            </Routes>
        </div>
    );
};

export default App;