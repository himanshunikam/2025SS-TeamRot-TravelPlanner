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
            setMessage('Registered successfully'); // Set success message
        } catch (err) {
            console.error("Error: ",err);
            if(err.response){
                console.log(err.response.data);
            }else{
                console.log(err.message);
            }
            setMessage('Failed to register, User already exists'); // Set error message
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