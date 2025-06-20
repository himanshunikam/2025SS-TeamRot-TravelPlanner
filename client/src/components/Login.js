// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import CSS for styling
import {Link} from 'react-router-dom';

const Login = ({ setLoggedInUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData,
        [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {

            const res =
                await axios.post(`${process.env.REACT_APP_API_URL}:5000/api/auth/login`,
                    {
                        username,
                        password
                    });

            localStorage.setItem('token', res.data.token);
            setLoggedInUser(username);
            setMessage('Logged in successfully');
        } catch (err) {

            console.error('Full error:', err);

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
            <h2>Login</h2>
            <Link to={"/register"}>Register</Link>
            <form onSubmit={onSubmit}>
                <input type="text"
                       placeholder="Username"
                       name="username"
                       value={username}
                       onChange={onChange}
                       required />
                <input type="password"
                       placeholder="Password"
                       name="password"
                       value={password}
                       onChange={onChange}
                       required />
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Login;