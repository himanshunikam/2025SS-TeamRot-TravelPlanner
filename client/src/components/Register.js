import React, { useState } from 'react';
import axios from 'axios';                     // HTTP client for API requests
import './LoginStyle.css';                     // Shared styles for auth forms
import { Link } from 'react-router';           // Navigation component for linking to login

// Register component handles user sign-up
const Register = () => {
    // State for username and password inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    // State for feedback messages (success or error)
    const [message, setMessage] = useState('');

    // Destructure values for easier access
    const { username, password } = formData;

    // Handle input changes dynamically for both fields
    const onChange = e =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value  // update username or password
        });

    // Handle form submission
    const onSubmit = async e => {
        e.preventDefault();                // Prevent page reload

        // Debug: log environment variables to ensure correct API base URL
        console.log('Environment check:');
        console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log(
            'All env vars:',
            Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
        );

        // Construct the full registration API URL
        const apiUrl = `${process.env.REACT_APP_API_URL}:5000/api/auth/register`;
        console.log('Full API URL:', apiUrl);

        try {
            // Send registration data to backend
            const res = await axios.post(apiUrl, { username, password });

            if (res && res.data) {
                // On success, show confirmation
                setMessage('Registered successfully');
                console.log('Registration response:', res.data);
            } else {
                // Handle unexpected empty responses
                setMessage('Unexpected response from server');
            }
        } catch (err) {
            console.error('Full error:', err);

            // If server responded with an error payload
            if (err.response) {
                console.error('Response data:', err.response.data);
                setMessage(
                    'Failed to register, ' +
                    (err.response.data.msg || 'User already exists')
                );
            } else if (err.request) {
                // If no response was received
                console.error('No response:', err.request);
                setMessage('No response from server, please try again later.');
            } else {
                // Other errors (e.g., setting up request)
                console.error('Error:', err.message);
                setMessage('Registration failed: ' + err.message);
            }
        }
    };

    return (
        <div className="auth-form">
            <div className="background">
                <div className="shape"></div>   {/* Decorative shape 1 */}
                <div className="shape"></div>   {/* Decorative shape 2 */}
            </div>

            <form onSubmit={onSubmit}>
                <h1>Register</h1>

                {/* Username input */}
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required                // HTML5 required validation
                />

                {/* Password input */}
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />

                {/* Submit button */}
                <button type="submit">Register</button>

                {/* Link to Login page */}
                <button>
                    <Link to="/login" className="Register">
                        Login
                    </Link>
                </button>
            </form>

            {/* Display feedback message to the user */}
            <p className="message">{message}</p>
        </div>
    );
};

export default Register;
