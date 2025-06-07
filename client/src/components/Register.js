// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import {Link} from "react-router-dom"; // Import CSS for styling

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
            <Link to={"/login"}>Login</Link>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                <button type="submit">Register</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Register;