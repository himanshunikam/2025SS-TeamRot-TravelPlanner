// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoginStyle.css';
import {Link} from "react-router"; // Import CSS for styling


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {

        e.preventDefault();
        console.log('Environment check:');
        console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('All env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));

        const apiUrl = `${process.env.REACT_APP_API_URL}:5000/api/auth/register`;
        console.log('Full API URL:', apiUrl);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}:5000/api/auth/register`, {

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
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form onSubmit={onSubmit}>

                <h1>Register</h1>

                <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />

                <button type="submit">Register</button>
                <button><Link to={"/login"} className="Register">Login</Link></button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Register;
