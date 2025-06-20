// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';// Import CSS for styling
import {Link} from 'react-router';
import './LoginStyle.css'
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

            // Set success message
            setMessage('Logged in successfully');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                console.log(err.response.data);
            }else{
                console.log(err.message);
            }
            // Set error message
            setMessage('Failed to login - wrong credentials');
        }
    };

    return (
        <div className="auth-form">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form onSubmit={onSubmit}>
                <h1>Login</h1>

                <input type="text"
                       placeholder="Username"
                       name="username"
                       value={username}
                       onChange={onChange}
                       required/>
                <input type="password"
                       placeholder="Password"
                       name="password"
                       value={password}
                       onChange={onChange}
                       required/>
                <button type="submit">Login</button>
                <button><Link to="/register" className="Register">Register</Link></button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Login;