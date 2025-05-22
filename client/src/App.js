// client/src/App.js
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TravelPlanner from "./components/travel-planner";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setLoggedInUser(null); // Set logged-in user to null
  };

  return (
      <Router>
      <div className="App">

        {loggedInUser ? (

            <div>
              <TravelPlanner />
            </div>
        ) : (
            <Routes>
              <Route path="/login" element={<Login setLoggedInUser = {setLoggedInUser} />} />
              <Route path="/register" element={<Register />} />
                <Route path="/travel" element={<TravelPlanner />}/>
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        )}
      </div>
      </Router>
  );
};

export default App;