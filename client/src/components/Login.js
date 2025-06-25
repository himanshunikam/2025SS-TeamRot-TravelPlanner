import React, { useState } from 'react';
import axios from 'axios';              // HTTP client for making API requests
import { Link } from 'react-router';    // For navigation to Register page
import './LoginStyle.css';             // Component-specific styles

// The Login component handles user authentication
// Accepts a prop `setLoggedInUser` to lift the username state up
const Login = ({ setLoggedInUser }) => {
    // formData holds username and password inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    // message for showing success or error feedback
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    // Update formData when any input changes
    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value  // dynamically set username or password
        });

    // Handle form submission
    const onSubmit = async e => {
        e.preventDefault();                // prevent default page reload

        try {
            // Send credentials to backend login endpoint
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}:5000/api/auth/login`,
                { username, password }
            );

            // On success, store JWT in localStorage
            localStorage.setItem('token', res.data.token);
            // Lift the username up to parent component
            setLoggedInUser(username);
            // Show success message
            setMessage('Logged in successfully');
        } catch (err) {
            console.error('Full error:', err);

            // Handle different error cases
            if (err.response && err.response.data) {
                console.error('Response data:', err.response.data);
                setMessage('Failed to login - ' + (err.response.data.msg || 'wrong credentials'));
            } else if (err.request) {
                console.error('No response received:', err.request);
                setMessage('No response from server, please try again later.');
            } else {
                console.error('Error:', err.message);
                setMessage('Login failed: ' + err.message);
            }
        }
    };

    return (
        <div className="auth-form">
            <div className="background">
                <div className="shape"></div>   {/* Decorative shapes */}
                <div className="shape"></div>
            </div>

            <form onSubmit={onSubmit}>
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required                // HTML5 validation
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />

                <button type="submit">Login</button>
                {/* Link to registration page */}
                <button>
                    <Link to="/register" className="Register">
                        Register
                    </Link>
                </button>
            </form>

            {/* Display feedback message */}
            <p className="message">{message}</p>
        </div>
    );
};

export default Login;
