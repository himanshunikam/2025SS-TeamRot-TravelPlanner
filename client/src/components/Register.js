// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            const res = await axios.post('http://localhost:4500/api/auth/register', {
                username,
                password
            });

            if (res && res.data) {
                setMessage('Registered successfully');
                console.log('Registration response:', res.data);
            } else {
                setMessage('Unexpected response from server');
            }
        } catch (err) {
            console.error('Full error:', err);
            if (err.response) {
                console.error('Response data:', err.response.data);
                setMessage('Failed to register, ' + (err.response.data.msg || 'User already exists'));
            } else if (err.request) {
                console.error('No response:', err.request);
                setMessage('No response from server, please try again later.');
            } else {
                console.error('Error:', err.message);
                setMessage('Registration failed: ' + err.message);
            }
        }
    };

    return (
        <div className="auth-form">
            <Link to={"/login"}>Login</Link>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Register;
